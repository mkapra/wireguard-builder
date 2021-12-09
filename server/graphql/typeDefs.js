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
`;