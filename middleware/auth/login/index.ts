import sqlquery from "database";
import { auth } from "interface";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const login = async (req: auth, res: any) => {
  const { email, password } = req.body;
  console.log(req.body)
  console.log('JWT_SECRET')
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const results: any = await sqlquery(sql, [email] as never);

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'JWT_SECRET',
        { expiresIn: "1h" }
      );
      res.json({ message: "Login successful", token });
      const savetoken = "UPDATE users SET token = ? WHERE id = ?"
      await sqlquery(savetoken, [token, user.id] as never)
    } else {
      res.status(400).json({ error: true, message: 'Password did not match' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err});
  }
}

export default login;

