const { gql } = require("apollo-server");

module.exports = gql`
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
    vpnNetwork(
      "The id of the vpn network that should be returned"
      id: ID!
    ): VpnNetwork

    "Returns all the vpn servers"
    servers(
      "A regex that should be matched against the name of the vpn servers"
      name: String
    ): [Server!]
    "Returns the vpn server with the given id"
    server("The id of the vpn server that should be returned" id: ID!): Server

    "Returns all the vpn clients"
    clients(
      "A regex that should be matched against the name of the vpn clients"
      name: String
    ): [Client!]
    "Returns the vpn client with the given id"
    client("The id of the vpn client that should be returned" id: ID!): Client
  }

  input newClientInput {
    "The name of the client"
    name: String!
    "The description of the client"
    description: String
    "The dns server that should be used by the client"
    dns_server: ID!
    "The vpn network that should be used by the client"
    vpn_network: ID!
    "The ip address of the client"
    ip_address: String!
    "The keepalive interval of the client. Default: 25"
    keepalive_interval: Int
    "The keypair id of the client"
    keypair: ID!
  }

  input newServerInput {
    "The name of the server"
    name: String!
    "The description of the server"
    description: String
    "The forward interface of the server"
    forward_interface: String!
    "The ip address of the server"
    ip_address: String!
    "The keypair of the server"
    keypair: ID!
    "The vpn network of the server"
    vpn_network: ID!
  }

  type Mutation {
    "Generates a new keypair"
    generateKeypair: Keypair!
    "Deletes a keypair by the given id"
    deleteKeypair(id: ID!): String!

    "Creates a new DNS server"
    createDnsServer(name: String!, description: String, ip: String!): DnsServer!
    "Updates a DNS server by the given id"
    updateDnsServer(
      id: ID!
      name: String
      description: String
      ip: String
    ): DnsServer!

    "Creates a new vpn network"
    createVpnNetwork(
      name: String!
      description: String
      ip_address: String!
      subnetmask: Int
      port: Int!
      interface: String!
    ): VpnNetwork!
    "Updates a vpn network by the given id"
    updateVpnNetwork(
      id: ID!
      name: String
      description: String
      ip_address: String
      subnetmask: Int
      port: Int
      interface: String
    ): VpnNetwork!

    "Creates a new vpn server"
    createServer(newServer: newServerInput!): Server!

    "Creates a new vpn client"
    createClient(newClient: newClientInput!): Client!
  }

  "A wireguard keypair containing a private and a public key"
  type Keypair {
    "The id of the keypair"
    id: ID!
    "The private key of the keypair"
    private_key: String!
    "The public key of the keypair"
    public_key: String!
    "The name of the client where the keypair is used"
    used_by_client: Client
    "The name of the server where the keypair is used"
    used_by_server: Server
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
    "The clients that use the DNS server"
    used_by_clients: [Client!]
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

  "A wireguard server"
  type Server {
    "The id of the server"
    id: ID!
    "The name of the server"
    name: String!
    "The description of the server"
    description: String
    "The IP address of the server"
    ip_address: String!
    "The interface where the other traffic should be forwarded to"
    forward_interface: String!
    "The keypair of the server"
    keypair: Keypair!
    "The vpn network that should be used by the server"
    vpn_network: VpnNetwork!
    "Clients that are associated with the server"
    clients: [Client!]
  }

  "A wireguard client"
  type Client {
    "The id of the client"
    id: ID!
    "The name of the client"
    name: String!
    "The description of the client"
    description: String
    "The dns server that should be used by the client"
    dns_server: DnsServer!
    "The vpn network that should be used by the client"
    vpn_network: VpnNetwork!
    "The ip address of the client"
    ip_address: String!
    "The keepalive interval of the client. Default: 25"
    keepalive_interval: Int
    "The keypair of the client"
    keypair: Keypair!
    "The server that the client is associated with"
    server: Server
  }
`;
