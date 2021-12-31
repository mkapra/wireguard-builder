const validator = require("../../validator");
const { UserInputError } = require("apollo-server");

const convertServerToObject = async (server, db) => {
  const vpnNetwork = await db.getVpnNetworkById(server.net_id);
  const keypair = await db.getKeypairById(server.key_id);

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
      const keypair_exists = await db.getKeypairById(keypair);
      if (!keypair_exists) {
        throw new UserInputError(`Keypair with id ${keypair} does not exist`);
      }

      // check that keypair is not used by other servers
      const keypair_used = await db.getServerByKeypair(keypair);
      if (keypair_used) {
        throw new UserInputError(
          `Keypair with id ${keypair} is already used by server ${keypair_used.name}`
        );
      }

      // validate vpn_network exists
      const vpn_network_exists = await db.getVpnNetworkById(vpn_network);
      if (!vpn_network_exists) {
        throw new UserInputError(
          `Vpn network with id ${vpn_network} does not exist`
        );
      }

      // validate that ip address is in range of vpn network
      const vpn_network_range = vpn_network_exists.subnetmask;
      const vpn_ip = vpn_network_exists.ip_address;
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
        name: name,
        description: description,
        forward_interface: forward_interface,
        ip_address: ip_address,
        key_id: keypair,
        net_id: vpn_network,
      };

      // Create server
      const createdServer = await db.createServer(server);
      // delete net_id from server and add whole vpn network instead
      createdServer.vpn_network = vpn_network_exists;
      createdServer.keypair = keypair_exists;

      return createdServer;
    },
  },
};
