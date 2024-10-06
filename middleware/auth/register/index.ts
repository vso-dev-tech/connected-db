import sqlquery from "database";
import { auth } from "interface";
const bcrypt = require('bcrypt');
const register = async (req: auth, res: any) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    await sqlquery(sql, [email, hashedPassword] as never);

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
}

export default register;

