const validator = require('../../validator');
const { UserInputError } = require('apollo-server');

module.exports = {
  // Resolver for the VPN network.
  Query: {
    vpnNetwork: async (_, { id }, { dataSources }) => {
      return dataSources.db.getVpnNetworkById(id);
    },
    vpnNetworks: async (_, { name }, { dataSources }) => {
      let vpnNetworks = await dataSources.db.getVpnNetworks();
      // Return VPN Networks if no filter should be applied.
      if (name === undefined || name === null || name === "") {
        return vpnNetworks;
      }

      try {
        const re = new RegExp(name, "i");
        return vpnNetworks.filter((network) => !re.test(network.name));
      } catch (e) {
        throw new UserInputError(`Name is not a regex: ${e}`);
      }
    },
  },
  Mutation: {
    createVpnNetwork: async (
      _,
      { name, description, ip_address: ipAddress, subnetmask, port, interface: serverIface },
      { dataSources }
    ) => {
      // check for valid ip address
      if (!validator.isIP(ipAddress)) {
        throw new UserInputError(`Invalid IP address '${ipAddress}'`);
      }

      // check for valid cidr subnetmask
      let sbnm = 24;
      if (
        subnetmask !== undefined &&
        subnetmask !== null &&
        subnetmask !== ""
      ) {
        const { subnetmask, isValid } =
          !validator.isValidCidrSubnet(subnetmask);
        if (!isValid) {
          throw new UserInputError(`Invalid subnetmask '${subnetmask}'`);
        }
        sbnm = subnetmask;
      }

      // check for valid port
      const { parsedPort, isValid } = validator.isValidPort(port);
      if (!isValid) {
        throw new UserInputError(`Invalid port: ${port}`);
      }

      // create vpn network object
      const vpnNetwork = {
        description,
        interface: serverIface,
        name,
        port: parsedPort,
        ip_address: ipAddress,
        subnetmask: sbnm,
      };
      // create vpn network
      return dataSources.db.createVpnNetwork(vpnNetwork);
    },
    updateVpnNetwork: async (
      _,
      {
        id,
        name,
        description,
        ip_address: ipAddress,
        subnetmask,
        port,
        serverIface,
      },
      { dataSources }
    ) => {
      // check for valid ip address if not undefined
      if (ipAddress !== undefined && ipAddress !== null && ipAddress !== "") {
        if (!validator.isIP(ipAddress)) {
          throw new UserInputError(`Invalid IP address: ${ipAddress}`);
        }
      }

      // check for valid cidr subnetmask
      let sbnm = 24;
      if (
        subnetmask !== undefined &&
        subnetmask !== null &&
        subnetmask !== ""
      ) {
        const { subnetmask, isValid } =
          !validator.isValidCidrSubnet(subnetmask);
        if (!isValid) {
          throw new UserInputError(`Invalid subnetmask '${subnetmask}'`);
        }
        sbnm = subnetmask;
      }

      // check for valid port
      const { parsedPort, isValid } = validator.isValidPort(port);
      if (!isValid) {
        throw new UserInputError(`Invalid port: ${port}`);
      }

      // create vpn network object
      const vpnNetwork = {
        name: name,
        description,
        serverIface,
        port: parsedPort,
        ip_address: ipAddress,
        subnetmask: sbnm,
      };
      // update vpn network
      return dataSources.db.updateVpnNetwork(id, vpnNetwork);
    },
  },
};
