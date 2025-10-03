const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
    category: String!
    inStock: Boolean!
  }

  type Order {
    id: ID!
    products: [Product!]!
    total: Int!
    customerName: String!
    customerEmail: String!
  }

  type Query {
    products: [Product!]!
    order(id: ID!): Order
  }

`;

let products = [
  { id: "1", name: "Pikpik Carrot", price: 2, inStock: true, category: "Item" },
  { id: "2", name: "Bomb Rock", price: 8, inStock: true, category: "Item"  },
  { id: "3", name: "Ice Blast", price: 8, inStock: false, category: "Item"  },
  { id: "4", name: "Emergency Kit", price: 5, inStock: true, category: "Item" },
  { id: "5", name: "Scrummy Bone", price: 3, inStock: true, category: "Item"  },
  { id: "6", name: "Lightning Shock", price: 30, inStock: false, category: "Item"  },
  { id: "7", name: "Trackonator", price: 10, inStock: true, category: "Item"  },
  { id: "8", name: "Mine", price: 10, inStock: false, category: "Item"  },
];

let orders = [];

const resolvers = {
  Query: {
    getProducts: () => products,
    getOrder: (_, { id }) => orders.find(o => o.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});