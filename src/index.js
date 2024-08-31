const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const app = express();

const mongoUrl =
  "mongodb+srv://valloryan2:8KiJIro8L8Mjgphp@cluster0.tohnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Database connected"))
  .catch((e) => console.log("Connection error:", e));

// Middleware to parse JSON
app.use(express.json());

// Route to insert data from the request body
app.post("/LoginCredentials", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const newUser = new UserModel({ email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while inserting user data" });
  }
});

// Route to fetch all users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
