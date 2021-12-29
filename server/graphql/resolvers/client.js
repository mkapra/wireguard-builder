const validator = require('../../validator')
const { UserInputError } = require('apollo-server')

const convertClientToObject = async (client, db) => {
  const ipObj = await db.getVpnIpById(client.ip_id)
  const vpnNetwork = await db.getVpnNetworkById(ipObj.net_id)
  const keypair = await db.getKeypairById(client.key_id)
  const dnsServer = await db.getDnsServerById(client.dns_server_id)

  return {
    ...client,
    vpn_network: vpnNetwork,
    dns_server: dnsServer,
    ip_address: ipObj.address,
    keepalive_interval: client.keepalive,
    keypair
  }
}

module.exports = {
  // Resolver for the server type
  Query: {
    clients: async (_, { name }, { dataSources }) => {
      let clients = await dataSources.db.getClients()
      // Map ids of references to objects
      clients = clients.map(async (client) =>
        convertClientToObject(client, dataSources.db)
      )

      // Return all clients if no filter should be applied
      if (name === undefined || name === null || name === '') {
        return clients
      }

      try {
        return clients.filter((client) => !re.test(client.name))
      } catch (e) {
        throw new UserInputError(`Name is not a regex: ${e}`)
      }
    },
    client: async (_, { id }, { dataSources }) => {
      return convertClientToObject(
        await dataSources.db.getClientById(id),
        dataSources.db
      )
    }
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
          keypair: keypairId
        }
      },
      { dataSources }
    ) => {
      // validate that dns_server exists in the database
      const dns_server_exists = await dataSources.db.getDnsServerById(
        dnsServerId
      )
      if (!dns_server_exists) {
        throw new UserInputError(
          `DNS Server with id '${dnsServerId}' does not exist`
        )
      }

      // validate that keypair exists in the database
      const keypair_exists = await dataSources.db.getKeypairById(keypairId)
      if (!keypair_exists) {
        throw new UserInputError(
          `Keypair with id '${keypairId}' does not exist`
        )
      }

      // validate existing vpn network
      const vpnNetwork = await dataSources.db.getVpnNetworkById(vpnNetworkId)
      if (!vpnNetwork) {
        throw new UserInputError(
          `VPN Network with id '${vpnNetworkId}' does not exist`
        )
      }

      // validate that the ip_address is valid
      if (!validator.isIP(ipAddress)) {
        throw new UserInputError(`IP Address '${ipAddress}' is invalid`)
      }
      // validate that ip address is in range of vpn_network
      const ip_address_in_range = validator.isInRange(
        ipAddress,
        vpnNetwork.ip_address,
        vpnNetwork.subnetmask
      )
      if (!ip_address_in_range) {
        throw new UserInputError(
          `IP Address '${ipAddress}' is not in range of VPN Network (${vpnNetwork.ip_address})`
        )
      }

      // set keepalive to 25 if not defined
      if (keepaliveInterval === undefined || keepaliveInterval === null) {
        keepaliveInterval = 25
      }

      // Create VPN IP
      let vpnIp = {
        address: ipAddress,
        net_id: vpnNetworkId
      }
      vpnIp = await dataSources.db.createVpnIp(vpnIp)

      // Create client
      const client = {
        name,
        description,
        dns_server_id: dnsServerId,
        keepalive: keepaliveInterval,
        key_id: keypairId,
        ip_id: vpnIp.id
      }

      return convertClientToObject(
        await dataSources.db.createClient(client),
        dataSources.db
      )
    }
  }
}
