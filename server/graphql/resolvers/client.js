const validator = require('../../validator');
const { UserInputError } = require('apollo-server');

module.exports = {
    // Resolver for the server type
    Query: {
        clients: async(_, { name }, { dataSources: { db } }) => {
            const clients = await db.getClients();
            if (name === undefined || name === null || name === "") {
                return clients;
            }

            try {
                const re = new RegExp(name, 'i');
                return clients.filter(client => { return re.test(client.name); });
            } catch (e) {
                throw new UserInputError(`Name is not a regex: ${e}`);
            }
        },
        client: async(_, { id }, { dataSources: { db } }) => {
            return db.getServer(id);
        }
    },
    Mutation: {
        createClient: async(_, { newClient: { name, description, dns_server, vpn_network, ip_address, keepalive_interval, keypair } }, { dataSources: { db } }) => {
            // validate that dns_server exists in the database
            const dns_exists = await db.getDnsServerById(dns_server);
            if (!dns_exists) {
                throw new UserInputError(`DNS Server ${dns_server} does not exist`);
            }

            // validate that keypair exists in the database
            const keypair_exists = await db.getKeypairById(keypair);
            if (!keypair_exists) {
                throw new UserInputError(`Keypair ${keypair} does not exist`);
            }

            // validate existing vpn network
            const vpnNetworkById = await db.getVpnNetworkById(vpn_network)
            if (!vpnNetworkById) {
                throw new UserInputError(`VPN Network ${vpn_network} does not exist`);
            }

            // validate that the ip_address is valid
            if (!validator.isIP(ip_address)) {
                throw new UserInputError(`IP Address ${ip_address} is not valid`);
            }
            // validate that ip address is in range of vpn_network
            const ip_address_in_range = validator.isInRange(ip_address, vpnNetworkById.ip_address, vpnNetworkById.subnetmask);
            if (!ip_address_in_range) {
                throw new UserInputError(`IP Address ${ip_address} is not in range of VPN Network ${vpn_network}`);
            }

            // set keepalive to 25 if not defined
            if (keepalive_interval === undefined || keepalive_interval === null) {
                keepalive_interval = 25;
            }

            // create vpn ip object
            const vpnIp = {
                address: ip_address,
                net_id: vpn_network
            };
            // create vpn ip
            const vpnIpId = await db.createVpnIp(vpnIp);

            // Create the client object
            const client = {
                name,
                description,
                dns_server_id: dns_server,
                keepalive: keepalive_interval,
                key_id: keypair,
                ip_id: vpnIpId.id
            };
            // Create the client
            const newClient = await db.createClient(client);
            newClient['vpn_network'] = vpnNetworkById;

            return newClient;
        }
    }
};