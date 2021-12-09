const keypairResolvers = require('./keypair');
const dnsServerResolvers = require('./dnsServer');

module.exports = {
    Query: {
        ...keypairResolvers.Query,
        ...dnsServerResolvers.Query
    },
    Mutation: {
        ...keypairResolvers.Mutation,
        ...dnsServerResolvers.Mutation
    }
};