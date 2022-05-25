const { ApolloServer, gql } = require("apollo-server");

const data = {
  beasts: [
    {
      id: 1,
      commonName: "Lion",
    },
    {
      id: 2,
      commonName: "Tiger",
    },
    {
      id: 3,
      commonName: "Elephant",
    },
    {
      id: 4,
      commonName: "Giraffe",
    },
  ],
};

const typeDefs = gql`
  type Beast {
    id: ID
    commonName: String
  }

  type Query {
    beasts: [Beast]
  }
  type Mutation {
    addBeast(beastName: String!): [Beast]
  }
`;

const resolvers = {
  Query: {
    beasts: () => data.beasts,
  },
  Mutation: {
    addBeast: (_, { beastName }) => [
      ...data.beasts,
      { id: data.beasts.length + 1, commonName: beastName },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(4000);
