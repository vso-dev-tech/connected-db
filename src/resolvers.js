// Import necessary packages and modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Ensure to load environment variables
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET); // Use secret from .env

      return {
        token,
        user,
      };
    },
    addUser: async (_, { email, password, username }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, username });
      const savedUser = await newUser.save();

      const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET); // Use secret from .env

      return {
        token,
        user: savedUser,
      };
    },
    updateUser: async (_, { id, email, password, username }) => {
      const updates = { email, username };
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      return await User.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteUser: async (_, { id }) => await User.findByIdAndDelete(id),
  },
};

module.exports = resolvers;
