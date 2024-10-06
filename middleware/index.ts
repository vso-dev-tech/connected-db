import { ApiResponse } from "interface";

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Make sure this is set correctly

const verifyToken = (req: ApiResponse, res: any, next: any) => {
  const token = req.headers["authorization"]; // Get the Authorization header
  
  // Check if token is provided
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  // Check if the token starts with 'Bearer ' and extract the actual token
  if (token.startsWith("Bearer ")) {
    const actualToken = token.split(" ")[1]; // Get the token after 'Bearer '
    
    // Verify the token using the actual secret
    jwt.verify(actualToken, 'JWT_SECRET', (err: any, decoded: any) => {
      if (err) {
        console.error("Token verification error:", err); // Log the error for debugging
        return res.status(500).json({ error: "Failed to authenticate token" });
      }
      
      next();
    });
  } else {
    return res.status(403).json({ error: "Invalid token format" });
  }
};

export default verifyToken;
