import { ApiResponse } from "interface";

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; 

const verifyToken = (req: ApiResponse, res: any, next: any) => {
  const token = req.headers["authorization"]; 
  
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    const actualToken = token.split(" ")[1];
    
    jwt.verify(actualToken, 'JWT_SECRET', (err: any, decoded: any) => {
      if (err) {
        console.error("Token verification error:", err); 
        return res.status(500).json({ error: "Failed to authenticate token" });
      }

      next();
    });
  } else {
    return res.status(403).json({ error: "Invalid token format" });
  }
};

export default verifyToken;
