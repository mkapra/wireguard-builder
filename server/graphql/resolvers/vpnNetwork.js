const validator = require('../../validator');
const { UserInputError } = require('apollo-server');

module.exports = {
    // Resolver for the VPN network.
    Query: {
        vpnNetwork: async(_, { id }, { dataSources: { db } }) => {
            return db.getVpnNetwork(id);
        },
        vpnNetworks: async(_, { name }, { dataSources: { db } }) => {
            let vpnNetworks = await db.getVpnNetworks();
            if (name === undefined || name === null || name === "") {
                return vpnNetworks;
            }

            try {
                const re = new RegExp(name, 'i');
                return vpnNetworks.filter(net => { return re.test(net.name); });
            } catch (e) {
                throw new UserInputError(`Name is not a regex: ${e}`);
            }
        }
    },
    Mutation: {
        createVpnNetwork: async(_, { name, description, ip_address, subnetmask, port, interface }, { dataSources: { db } }) => {
            // check for valid ip address
            if (!validator.isIP(ip_address)) {
                throw new UserInputError(`Invalid IP address: ${ip_address}`);
            }

            // check for valid cidr subnetmask
            let sbnm = 24;
            if (subnetmask !== undefined && subnetmask !== null && subnetmask !== "") {
                const sbnm = parseInt(subnetmask);
                if (!validator.isIP(subnetmask) || (sbnm < 0 || sbnm > 32)) {
                    throw new UserInputError(`Invalid subnetmask: ${subnetmask}`);
                }

                subnetmask = sbnm;
            }

            // check for valid port
            if (port !== undefined && port !== null && port !== "") {
                const p = parseInt(port);
                if (p < 0 || p > 65535) {
                    throw new UserInputError(`Invalid port: ${port}`);
                }

                port = p;
            }

            // create vpn network object
            const vpnNetwork = {
                name: name,
                description: description,
                ip_address: ip_address,
                subnetmask: sbnm,
                port: port,
                interface: interface
            };
            // create vpn network
            return db.createVpnNetwork(vpnNetwork);
        },
        updateVpnNetwork: async(_, { id, name, description, ip_address, subnetmask, port, interface }, { dataSources: { db } }) => {
            // check for valid ip address if not undefined
            if (ip_address !== undefined && ip_address !== null && ip_address !== "") {
                if (!validator.isIP(ip_address)) {
                    throw new UserInputError(`Invalid IP address: ${ip_address}`);
                }
            }

            // check for valid cidr subnetmask
            let sbnm = 24;
            if (subnetmask !== undefined && subnetmask !== null && subnetmask !== "") {
                const sbnm = parseInt(subnetmask);
                if (!validator.isIP(subnetmask) || (sbnm < 0 || sbnm > 32)) {
                    throw new UserInputError(`Invalid subnetmask: ${subnetmask}`);
                }

                subnetmask = sbnm;
            }

            // check for valid port
            if (port !== undefined && port !== null && port !== "") {
                const p = parseInt(port);
                if (p < 0 || p > 65535) {
                    throw new UserInputError(`Invalid port: ${port}`);
                }

                port = p;
            }

            // create vpn network object
            const vpnNetwork = {
                name: name,

                description: description,
                ip_address: ip_address,
                subnetmask: sbnm,
                port: port,
                interface: interface
            };
            // update vpn network
            return db.updateVpnNetwork(id, vpnNetwork);
        }
    }
};