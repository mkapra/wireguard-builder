const validator = require('../../validator');
const { UserInputError } = require('apollo-server');

module.exports = {
  // Resolver for the keypair.
  Query: {
    dnsServers: async (_, { name }, { dataSources }) => {
      let dnsServers = await dataSources.db.getDnsServers();
      // Return dns servers if no filter should be applied.
      if (name === undefined || name === null || name === "") {
        return dnsServers;
      }

      try {
        const re = new RegExp(name, "i");
        return dnsServers.filter((dnsServer) => !re.test(dnsServer.name));
      } catch (e) {
        throw new UserInputError(`Name is not a regex: ${e}`);
      }
    },
    dnsServer: (_, { id }, { dataSources }) => {
      return dataSources.db.getDnsServersById(id);
    },
    Mutation: {
      createDnsServer: async(_, { name, ip, description }, { dataSources: { db } }) => {
        // Check for valid ip address
        if (!validator.isIP(ip)) {
            throw new UserInputError(`Invalid IP address: ${ip}`);
        }

        const newDnsServer = {
          name,
          ip_address: ip,
          description,
        };
        return dataSources.db.createDnsServer(newDnsServer);
    },
    updateDnsServer: async (
      _,
      { id, name, ip, description },
      { dataSources }
    ) => {
      // Check for valid ip address if defined
      if (!validator.isIP(ip)) {
        throw new UserInputError("Invalid IP address");
      }

      const updatedDnsServer = {
        name,
        ip_address: ip,
        description,
      };
      return dataSources.db.updateDnsServer(id, updatedDnsServer);
    },
  },
};
