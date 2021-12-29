const process = require('process')
const { ApolloServer } = require('apollo-server')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const DatabaseModels = require('./models')
const { DB_NAME, DB_PORT, DB_HOST } = require('./config')

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || DB_HOST,
    port: process.env.DB_PORT || DB_PORT,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || DB_NAME
  }
}
const db = new DatabaseModels(knexConfig)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db })
})

server.listen({ port: process.env.WEB_PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
