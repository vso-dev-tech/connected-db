// Import the User model to interact with the MongoDB collection
const User = require("./models/User");

const resolvers = {
  Query: {
    // Resolver for fetching all users
    users: async () => {
      // Return all users found in the database
      return await User.find();
    },
    // Resolver for fetching a single user by ID
    user: async (_, { id }) => {
      // Return a specific user found by ID
      return await User.findById(id);
    },
  },
  Mutation: {
    // Resolver for adding a new user
    addUser: async (_, { email, password, username }) => {
      // Create a new user instance
      const user = new User({ email, password, username });
      // Save the user to the database and return it
      return await user.save();
    },
    // Resolver for updating an existing user by ID
    updateUser: async (_, { id, email, password, username }) => {
      // Create an object with the fields to update
      const updates = { email, password, username };
      // Remove undefined properties from updates object
      Object.keys(updates).forEach(
        (key) => updates[key] === undefined && delete updates[key]
      );

      // Find the user by ID and update it with the new data, return the updated user
      return await User.findByIdAndUpdate(id, updates, { new: true });
    },
    // Resolver for deleting a user by ID
    deleteUser: async (_, { id }) => {
      // Find the user by ID and delete it, return the deleted user
      return await User.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
