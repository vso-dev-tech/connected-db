// Import gql from apollo-server to define GraphQL schema
const { gql } = require('apollo-server');

// Define GraphQL schema using SDL (Schema Definition Language)
const typeDefs = gql`
  # User type definition, describes what fields a User object will have
  type User {
    id: ID!           # Unique identifier for the user
    email: String!    # Email address, required
    password: String! # Password, required (consider hashed in real-world apps)
    username: String! # Username, required
  }

  # Queries available to fetch data
  type Query {
    users: [User]         # Fetch all users, returns an array of User objects
    user(id: ID!): User   # Fetch a specific user by ID
  }

  # Mutations available to modify data
  type Mutation {
    addUser(email: String!, password: String!, username: String!): User
    # Mutation to add a new user, requires email, password, and username

    updateUser(id: ID!, email: String, password: String, username: String): User
    # Mutation to update an existing user, ID required; other fields are optional

    deleteUser(id: ID!): User
    # Mutation to delete a user by ID
  }
`;

module.exports = typeDefs;
