const { UserInputError } = require('apollo-server');
const validator = require('../../validator');

module.exports = {
    // Resolver for the keypair.
    Query: {
        dnsServers: async(_, { name }, { dataSources: { db } }) => {
            let dnsServers = await db.getDnsServers();
            if (name === undefined || name === null || name === '') {
                return dnsServers;
            }

            try {
                const re = new RegExp(name, 'i');
                return dnsServers.filter(dnsServer => { return re.test(dnsServer.name); });
            } catch (e) {
                throw new UserInputError(`Name is not a regex: ${e}`);
            }
        },
        dnsServer: (_, { id }, { dataSources: { db } }) => {
            return db.getDnsServersById(id);
        }
    },
    Mutation: {
        createDnsServer: async(_, { name, ip, description }, { dataSources: { db } }) => {
            // Check for valid ip address
            if (!validator.isIP(ip)) {
                throw new UserInputError(`Invalid IP address: ${ip_address}`);
            }

            const newDnsServer = {
                name,
                ip_address: ip,
                description
            };
            return db.createDnsServer(newDnsServer);
        },
        updateDnsServer: async(_, { id, name, ip, description }, { dataSources: { db } }) => {
            // Check for valid ip address if defined
            if (ip !== undefined && ip !== null && ip !== '') {
                if (!ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
                    throw new UserInputError('Invalid IP address');
                }
            }

            const updatedDnsServer = {
                name,
                ip_address: ip,
                description
            };
            return db.updateDnsServer(id, updatedDnsServer);
        }
    }
};