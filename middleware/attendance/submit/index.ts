import tokenvalidation from "helpers";
import { ApiResponse } from "interface/index";
import sqlquery from "database";

const submit = async (req: ApiResponse, res: any) => {
  try {
    const token = req.headers['authorization'];
    const { attendance, remarks, date, studentId } = req.body;

    const response = await tokenvalidation(token);
    if (!token) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    if (!response.staffId || !attendance || !date || !studentId) {
      return res.status(400).json({ error: "Params are incomplete or empty" });
    }

    const sql = `
      INSERT INTO attendance (staffId, studentId, attendance, remarks, date)
      VALUES (?, ?, ?, ?, ?)
    `;

    await sqlquery(sql, [response[0].staffId, studentId, attendance, remarks, date] as never);

    return res.status(201).json({ message: "Attendance submitted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default submit;
