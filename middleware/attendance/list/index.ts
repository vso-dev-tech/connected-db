import sqlquery from "database";
import tokenvalidation from "helpers";
import { ApiResponse } from "interface";

const list = async (req: ApiResponse, res: any) => {
  const token = req.headers['authorization'];
  try {

    const response = await tokenvalidation(token)
    if(!response){
      res.status(400).json({ error: "Invalid Token" });
    }
    console.log(response[0].classId)
    const studentsql = `
      SELECT 
        s.studentId, s.name, s.photo, s.gender, s.classId,
        a.attendanceId, COALESCE(a.attendance, 'Not taken') AS attendance, a.remarks
      FROM 
        students s
      LEFT JOIN 
        attendance a 
      ON 
        s.studentId = a.studentId
      WHERE 
        s.classId = ?`;

    const studentResults: any = await sqlquery(studentsql, [response[0].classId] as never);

    if (studentResults.length > 0) {
      return res.status(200).json({ students: studentResults });
    } else {
      return res.status(404).json({ message: "No students found" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export default list;
