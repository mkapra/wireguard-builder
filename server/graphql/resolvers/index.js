const keypairResolvers = require('./keypair');
const dnsServerResolvers = require('./dnsServer');
const vpnNetworkResolvers = require('./vpnNetwork');

module.exports = {
    Query: {
        ...keypairResolvers.Query,
        ...dnsServerResolvers.Query,
        ...vpnNetworkResolvers.Query
    },
    Mutation: {
        ...keypairResolvers.Mutation,
        ...dnsServerResolvers.Mutation,
        ...vpnNetworkResolvers.Mutation,
    }
};