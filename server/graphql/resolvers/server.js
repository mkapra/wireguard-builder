const validator = require("../../validator");
const { UserInputError } = require("apollo-server");

const convertServerToObject = async (server, db) => {
  const vpnNetwork = await db.getVpnNetworkById(server.vpn_network_id);
  const keypair = await db.getKeypairById(server.keypair_id);

  return {
    ...server,
    vpn_network: vpnNetwork,
    keypair,
  };
};

module.exports = {
  // Resolver for the server type
  Query: {
    servers: async (_, { name }, { dataSources }) => {
      let servers = await dataSources.db.getServers();
      servers = servers.map(async (server) =>
        convertServerToObject(server, dataSources.db)
      );
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
      return convertServerToObject(dataSources.db.getServer(id));
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
          keypair,
          vpn_network,
        },
      },
      { dataSources: { db } }
    ) => {
      // validate keypair exists
      const keypairExists = await db.getKeypairById(keypair);
      if (!keypairExists) {
        throw new UserInputError(`Keypair with id ${keypair} does not exist`);
      }

      // check that keypair is not used by other servers
      const serverOfKeypair = await db.getServerByKeypair(keypair);
      if (serverOfKeypair) {
        throw new UserInputError(
          `Keypair with id ${keypair} is already used by server ${serverOfKeypair.name}`
        );
      }

      // validate vpn_network exists
      const vpnNetworkExists = await db.getVpnNetworkById(vpn_network);
      if (!vpnNetworkExists) {
        throw new UserInputError(
          `Vpn network with id ${vpn_network} does not exist`
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
          `IP address ${ip_address} is not in range of vpn network ${vpn_network}`
        );
      }

      // Create server object
      const server = {
        name,
        description,
        forward_interface,
        ip_address,
        keypair_id: keypair,
        vpn_network_id: vpn_network,
      };

      // Create server
      const createdServer = await db.createServer(server);
      // delete net_id from server and add whole vpn network instead
      createdServer.vpn_network = vpnNetworkExists;
      createdServer.keypair = keypairExists;

      return createdServer;
    },
  },
};
