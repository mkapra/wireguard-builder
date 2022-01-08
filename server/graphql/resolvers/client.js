const validator = require("../../validator");
const { UserInputError } = require("apollo-server");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports = {
  Client: {
    keypair: async (parent, _, { dataSources }) => {
      return dataSources.db.getKeypairById(parent.keypair_id);
    },
    dns_server: async (parent, _, { dataSources }) => {
      return dataSources.db.getDnsServerById(parent.dns_server_id);
    },
    vpn_network: async (parent, _, { dataSources }) => {
      const vpnIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      return dataSources.db.getVpnNetworkById(vpnIp.vpn_network_id);
    },
    ip_address: async (parent, _, { dataSources }) => {
      const vpnIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      return vpnIp.address;
    },
    keepalive_interval: async (parent) => {
      return parent.keepalive || 25;
    },
    server: async (parent, _, { dataSources }) => {
      return dataSources.db.getServerByClientVpnIpId(parent.id);
    },
    config: async (parent, __, { dataSources }) => {
      const templatePath = path.join(
        __dirname,
        "config_templates",
        "client.template"
      );

      // get private key for client
      const keypair = await dataSources.db.getKeypairById(parent.keypair_id);
      // get server public key for client
      const server = await dataSources.db.getServerByClientVpnIpId(
        parent.vpn_ip_id
      );
      const serverKeypair = await dataSources.db.getKeypairById(
        server.keypair_id
      );
      // get dns server for client
      const dnsServer = await dataSources.db.getDnsServerById(
        parent.dns_server_id
      );
      // get vpn ip address
      const vpnIp = await dataSources.db.getVpnIpById(parent.vpn_ip_id);
      // get vpn network
      const vpnNetwork = await dataSources.db.getVpnNetworkById(
        vpnIp.vpn_network_id
      );

      const template = fs.readFileSync(templatePath, "utf8");
      const compiledTemplate = Handlebars.compile(template);
      return compiledTemplate({
        privateKeyClient: keypair.private_key,
        publicKeyServer: serverKeypair.public_key,
        ipAddress: `${vpnIp.address}/${vpnNetwork.subnetmask}`,
        dnsServer: dnsServer.ip_address,
        keepalive: parent.keepalive,
        endpointIp: `${server.external_ip_address}:${vpnNetwork.port}`,
      });
    },
  },
  // Resolver for the server type
  Query: {
    clients: async (_, { name }, { dataSources }) => {
      const clients = await dataSources.db.getClients();

      // Return all clients if no filter should be applied
      if (name === undefined || name === null || name === "") {
        return clients;
      }

      try {
        const re = new RegExp(name, "i");
        return clients.filter((client) => !re.test(client.name));
      } catch (e) {
        throw new UserInputError(`Name is not a regex: ${e}`);
      }
    },
    client: async (_, { id }, { dataSources }) => {
      return dataSources.db.getClientById(id);
    },
  },
  Mutation: {
    createClient: async (
      _,
      {
        newClient: {
          name,
          description,
          dns_server: dnsServerId,
          vpn_network: vpnNetworkId,
          ip_address: ipAddress,
          keepalive_interval: keepaliveInterval,
          keypair: keypairId,
        },
      },
      { dataSources }
    ) => {
      // validate that dns_server exists in the database
      const dns_server_exists = await dataSources.db.getDnsServerById(
        dnsServerId
      );
      if (!dns_server_exists) {
        throw new UserInputError(
          `DNS Server with id '${dnsServerId}' does not exist`
        );
      }

      // validate that keypair exists in the database
      const keypair_exists = await dataSources.db.getKeypairById(keypairId);
      if (!keypair_exists) {
        throw new UserInputError(
          `Keypair with id '${keypairId}' does not exist`
        );
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

      // validate existing vpn network
      const vpnNetwork = await dataSources.db.getVpnNetworkById(vpnNetworkId);
      if (!vpnNetwork) {
        throw new UserInputError(
          `VPN Network with id '${vpnNetworkId}' does not exist`
        );
      }

      // validate that the ip_address is valid
      if (!validator.isIP(ipAddress)) {
        throw new UserInputError(`IP Address '${ipAddress}' is invalid`);
      }
      // validate that ip address is in range of vpn_network
      const ipInRange = validator.isInRange(
        ipAddress,
        vpnNetwork.ip_address,
        vpnNetwork.subnetmask
      );
      if (!ipInRange) {
        throw new UserInputError(
          `IP Address '${ipAddress}' is not in range of VPN Network (${vpnNetwork.ip_address})`
        );
      }

      // set keepalive to 25 if not defined
      if (keepaliveInterval === undefined || keepaliveInterval === null) {
        keepaliveInterval = 25;
      }

      // Create VPN IP
      let vpnIp = {
        address: ipAddress,
        vpn_network_id: vpnNetworkId,
      };
      vpnIp = await dataSources.db.createVpnIp(vpnIp);

      // Create client
      const client = {
        name,
        description,
        dns_server_id: dnsServerId,
        keepalive: keepaliveInterval,
        keypair_id: keypairId,
        vpn_ip_id: vpnIp.id,
      };

      return dataSources.db.createClient(client);
    },
  },
};
