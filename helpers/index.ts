import sqlquery from "database/index";
import { ApiResponse } from "interface";

const tokenvalidation = async (token: string | undefined) => {
  try {
    const sql = "SELECT * FROM users WHERE token = ?";
    const results: any = await sqlquery(sql, [token] as never);

    if (results.length === 0) {
      return false;
    }
    return results;
  } catch(err){
    throw err
  }
}

export default tokenvalidation;