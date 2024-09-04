const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    addUser(email: String!, password: String!, username: String!): AuthPayload
    updateUser(id: ID!, email: String, password: String, username: String): User
    deleteUser(id: ID!): User
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
