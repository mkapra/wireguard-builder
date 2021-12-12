const { ApolloServer } = require('apollo-server');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const DatabaseModels = require('./models');
const { DB_NAME, DB_PORT, DB_HOST } = require('./config');

const knexConfig = {
    client: 'pg',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME
    }
};
const db = new DatabaseModels(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ db })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});