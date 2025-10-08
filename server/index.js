import express from "express";
import path from "path";
const { ApolloServer, gql } = require("apollo-server");
const app = express();

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

app.use("/images", express.static(path.join(process.cwd(), "public/images")));

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
    category: String!
    inStock: Boolean!
    photo: String!
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

  type Mutation {
    createOrder(
      productIds: [ID!]!
      customerName: String!
      customerEmail: String!
    ): Order!
  }
`;

let products = [
  {
    id: "1",
    name: "Spicy Spray",
    price: 2,
    inStock: true,
    category: "Item",
    photo: "./src/assets/spicy_spray.png",
  },
  {
    id: "2",
    name: "Bomb Rock",
    price: 8,
    inStock: true,
    category: "Item",
    photo: "./src/assets/bomb_rock.png",
  },
  {
    id: "3",
    name: "Ice Blast",
    price: 8,
    inStock: false,
    category: "Item",
    photo: "./src/assets/ice_blast.png",
  },
  {
    id: "4",
    name: "Emergency Kit",
    price: 5,
    inStock: true,
    category: "Item",
    photo: "./src/assets/emergency_kit.png",
  },
  {
    id: "5",
    name: "Scrummy Bone",
    price: 3,
    inStock: true,
    category: "Item",
    photo: "./src/assets/scrummy_bone.png",
  },
  {
    id: "6",
    name: "Lightning Shock",
    price: 30,
    inStock: false,
    category: "Item",
    photo: "./src/assets/lightning_shock.png",
  },
  {
    id: "7",
    name: "Trackonator",
    price: 10,
    inStock: true,
    category: "Item",
    photo: "./src/assets/trackonator.png",
  },
  {
    id: "8",
    name: "Mine",
    price: 10,
    inStock: false,
    category: "Item",
    photo: "./src/assets/mine.png",
  },
];

let orders = [];

const resolvers = {
  Query: {
    products: () => products,
    order: (_, { id }) => orders.find((o) => o.id === id),
  },
  Mutation: {
    createOrder: (_, { productIds, customerName, customerEmail }) => {
      const selected = products.filter((p) => productIds.includes(p.id));
      const total = selected.reduce((sum, p) => sum + p.price, 0);
      const newOrder = {
        id: String(orders.length + 1),
        products: selected,
        total,
        customerName,
        customerEmail,
      };
      orders.push(newOrder);
      return newOrder;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
