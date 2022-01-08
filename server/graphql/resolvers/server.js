const validator = require("../../validator");
const { UserInputError } = require("apollo-server");

module.exports = {
  // Resolver for the server type
  Server: {
    keypair: async (parent, _, { dataSources }) => {
      return dataSources.db.getKeypairById(parent.keypair_id);
    },
    vpn_network: async (parent, _, { dataSources }) => {
      const vpnIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      return dataSources.db.getVpnNetworkById(vpnIp.vpn_network_id);
    },
    clients: async (parent, _, { dataSources }) => {
      const vpnNetworkIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      return dataSources.db.getClientsByServerId(vpnNetworkIp.id);
    },
    ip_address: async (parent, _, { dataSources }) => {
      const vpnIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      return vpnIp.address;
    },
  },
  Query: {
    servers: async (_, { name }, { dataSources }) => {
      const servers = await dataSources.db.getServers();
      if (name === undefined || name === null || name === "") {
        return servers;
      }

      try {
        const re = new RegExp(name, "i");
        return servers.filter((server) => !re.test(server.name));
      } catch (e) {
        throw new UserInputError(`Name is not a regex: ${e}`);
      }
    },
    server: async (_, { id }, { dataSources }) => {
      return dataSources.db.getServerById(id);
    },
  },
  Mutation: {
    createServer: async (
      _,
      {
        newServer: {
          name,
          description,
          forward_interface,
          ip_address,
          keypair: keypairId,
          vpn_network: vpnNetworkId,
        },
      },
      { dataSources }
    ) => {
      // validate keypair exists
      const keypairExists = await dataSources.db.getKeypairById(keypairId);
      if (!keypairExists) {
        throw new UserInputError(`Keypair with id ${keypairId} does not exist`);
      }
      // Check if keypair is used by other server or client
      const clientUsed = await dataSources.db.getClientByKeypairId(keypairId);
      if (clientUsed) {
        throw new UserInputError(
          `Keypair with id '${keypairId}' is already used by client '${clientUsed.name}'`
        );
      }
      const serverUsed = await dataSources.db.getServerByKeypairId(keypairId);
      if (serverUsed) {
        throw new UserInputError(
          `Keypair with id '${keypairId}' is already used by server '${serverUsed.name}'`
        );
      }

      // check that keypair is not used by other servers
      const serverOfKeypair = await dataSources.db.getServerByKeypair(
        keypairId
      );
      if (serverOfKeypair) {
        throw new UserInputError(
          `Keypair with id ${keypairId} is already used by server ${serverOfKeypair.name}`
        );
      }

      // validate vpn_network exists
      const vpnNetworkExists = await dataSources.db.getVpnNetworkById(
        vpnNetworkId
      );
      if (!vpnNetworkExists) {
        throw new UserInputError(
          `Vpn network with id ${vpnNetworkId} does not exist`
        );
      }

      // validate that ip address is in range of vpn network
      const vpn_network_range = vpnNetworkExists.subnetmask;
      const vpn_ip = vpnNetworkExists.ip_address;
      const ip_address_in_range = validator.isInRange(
        ip_address,
        vpn_ip,
        vpn_network_range
      );
      if (!ip_address_in_range) {
        throw new UserInputError(
          `IP address ${ip_address} is not in range of vpn network ${vpnNetworkId}`
        );
      }

      let vpnIp = {
        address: ip_address,
        vpn_network_id: vpnNetworkId,
      };
      vpnIp = await dataSources.db.createVpnIp(vpnIp);

      // Create server
      const server = {
        name,
        description,
        forward_interface,
        keypair_id: keypairId,
        vpn_ip_id: vpnIp.id,
      };
      const createdServer = await dataSources.db.createServer(server);

      return createdServer;
    },
  },
};
