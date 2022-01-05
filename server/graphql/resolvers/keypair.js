const { ApolloError } = require("apollo-server");

module.exports = {
  // Resolver for the keypair.
  Keypair: {
    used_by_client: async (parent, _, { dataSources }) => {
      return dataSources.db.getClientByKeypairId(parent.id);
    },
    used_by_server: async (parent, _, { dataSources }) => {
      return dataSources.db.getServerByKeypairId(parent.id);
    },
  },
  Query: {
    keypairs: async (_, __, { dataSources }) => {
      return dataSources.db.getKeypairs();
    },
    keypair: async (_, { id }, { dataSources }) => {
      return dataSources.db.getKeypairById(id);
    },
  },
  Mutation: {
    generateKeypair: async (_, __, { dataSources }) => {
      return dataSources.db.createKeypair();
    },
    deleteKeypair: async (_, { id }, { dataSources }) => {
      return dataSources.db
        .deleteKeypair(id)
        .then((count) => {
          if (count === 1) {
            return `Keypair with id '${id}' deleted!`;
          } else {
            throw new ApolloError(`Keypair with id ${id} not found!`);
          }
        })
        .catch((err) => {
          throw new ApolloError(err);
        });
    },
  },
};
