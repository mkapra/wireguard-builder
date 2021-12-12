const { gql } = require('apollo-server');

module.exports = gql `
  type Query {
    "Returns all the keypairs"
    keypairs: [Keypair!]
    "Returns the keypair with the given id"
    keypair("The id of the keypair that should be returned" id: ID!): Keypair

    "Returns all the DNS servers"
    dnsServers(
        "A regex that should be matched against the name of the DNS servers"
        name: String
    ): [DnsServer!]
    dnsServer(
        "The id of the DNS server that should be returned"
        id: ID!
    ): DnsServer

    "Returns all the vpn networks"
    vpnNetworks(
        "A regex that should be matched against the name of the vpn networks"
        name: String
    ): [VpnNetwork!]
    "Returns the vpn network with the given id"
    vpnNetwork("The id of the vpn network that should be returned" id: ID!): VpnNetwork
  }

  type Mutation {
    "Generates a new keypair"
    generateKeypair: Keypair!
    "Deletes a keypair by the given id"
    deleteKeypair(id: ID!): String!

    "Creates a new DNS server"
    createDnsServer(name: String!, description: String, ip: String!): DnsServer!
    "Updates a DNS server by the given id"
    updateDnsServer(id: ID!, name: String, description: String, ip: String): DnsServer!

    "Creates a new vpn network"
    createVpnNetwork(name: String!, description: String, ip_address: String!, subnetmask: Int, port: Int!, interface: String!): VpnNetwork!
    "Updates a vpn network by the given id"
    updateVpnNetwork(id: ID!, name: String, description: String, ip_address: String, subnetmask: Int, port: Int, interface: String): VpnNetwork!
  }

  "A wireguard keypair containing a private and a public key"
  type Keypair {
    "The id of the keypair"
    id: ID!
    "The private key of the keypair"
    private_key: String!
    "The public key of the keypair"
    public_key: String!
  }

  "A DNS server"
  type DnsServer {
    "The id of the DNS server"
    id: ID!
    "The name of the DNS server"
    name: String!
    "A description of the DNS server"
    description: String
    "The IP address of the DNS server"
    ip_address: String!
  }

  "The definition of a vpn network"
  type VpnNetwork {
    "The id of the VPN network"
    id: ID!
    "The name of the VPN network"
    name: String!
    "The description of the VPN network"
    description: String
    "The IP address of the VPN network"
    ip_address: String!
    "The subnetmask of the VPN network"
    subnetmask: String!
    "The port of the VPN network"
    port: Int!
    "The interface of the VPN network"
    interface: String!
  }
`;