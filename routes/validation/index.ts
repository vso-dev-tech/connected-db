
import express from "express";
import {validation } from "interface";
import verifyToken from "middleware";

const router = express.Router();

router.get("/", verifyToken, (req: validation, res: any) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

export default router;
