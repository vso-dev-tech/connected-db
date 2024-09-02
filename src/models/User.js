// Import mongoose to define the schema and create a model
const mongoose = require("mongoose");

// Define the User schema with email, password, and username fields
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Make email required
    unique: true, // Ensure email is unique across all users
  },
  password: {
    type: String,
    required: true, // Make password required
  },
  username: {
    type: String,
    required: true, // Make username required
  },
});

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
