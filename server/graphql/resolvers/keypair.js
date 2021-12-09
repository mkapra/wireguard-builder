const { ApolloError } = require("apollo-server");

module.exports = {
    // Resolver for the keypair.
    Query: {
        keypairs: async(_, __, { dataSources: { db } }) => {
            return db.getKeypairs();
        },
        keypair: async(_, { id }, { dataSources: { db } }) => {
            return db.getKeypairById(id).then(keypair => {
                return keypair;
            });
        }
    },
    Mutation: {
        generateKeypair: async(_, __, { dataSources: { db } }) => {
            const keypair = await db.createKeypair();
            return keypair;
        },
        deleteKeypair: async(_, { id }, { dataSources: { db } }) => {
            return db.deleteKeypair(id)
                .then((count) => {
                    if (count === 1) {
                        return `Keypair with id ${id} deleted!`;
                    } else {
                        throw new ApolloError(`Keypair with id ${id} not found!`);
                    }
                })
                .catch((err) => {
                    throw new ApolloError(err);
                });
        }
    }
};