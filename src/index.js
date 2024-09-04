// Import necessary packages and modules
require('dotenv').config(); // Load environment variables from .env
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// MongoDB connection URI
const MONGO_DB_URI = process.env.MONGO_DB_URI; // Use environment variable for URI

// Connect to MongoDB
mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET); // Use secret from .env
        return { userId };
      } catch (err) {
        console.error('JWT Verification Error:', err);
      }
    }
    return {};
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
