import express from "express";
import authRouter from "./auth";  
import validation from "./validation";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/", validation);

export default router;
