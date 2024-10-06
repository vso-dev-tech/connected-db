
const Router = require('express');
import register from "middleware/auth/register";

const router = Router();

router.post("/", register);

export default router;
