
import express from "express";
import { ApiResponse } from "interface/index";
import verifyToken from "middleware/validation";

const router = express.Router();

router.get("/", verifyToken, (req: ApiResponse, res: any) => {
  res.json({ message: "This is a protected route" });
});

export default router;
