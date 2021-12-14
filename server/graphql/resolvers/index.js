const keypairResolvers = require('./keypair');
const dnsServerResolvers = require('./dnsServer');
const vpnNetworkResolvers = require('./vpnNetwork');
const serverResolvers = require('./server');

module.exports = {
    Query: {
        ...keypairResolvers.Query,
        ...dnsServerResolvers.Query,
        ...vpnNetworkResolvers.Query,
        ...serverResolvers.Query
    },
    Mutation: {
        ...keypairResolvers.Mutation,
        ...dnsServerResolvers.Mutation,
        ...vpnNetworkResolvers.Mutation,
        ...serverResolvers.Mutation
    }
};