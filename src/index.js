const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET; // Replace this with a more secure secret in production

// Create connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb", // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Promisify db.query to use async/await
const query = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// API endpoint to register a user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    await query(sql, [email, hashedPassword]);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// API endpoint to log in a user and generate JWT
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const results = await query(sql, [email]);

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate JWT token upon successful login
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        token, // Send token in the response
      });
    } else {
      return res.status(400).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Example of a protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
