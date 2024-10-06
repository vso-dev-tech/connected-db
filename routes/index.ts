import express from "express";
import authRouter from "./auth";  
import validation from "./validation";
import attendancelist from "./attendance"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/", validation);
router.use('/attendance', attendancelist)
export default router;
