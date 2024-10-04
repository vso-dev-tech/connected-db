const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb", 
});

db.connect((err: any) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const sqlquery = (sql: string, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err: any, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export default sqlquery;
