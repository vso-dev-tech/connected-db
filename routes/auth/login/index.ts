const Router = require('express');
import login from "middleware/auth/login";

const router = Router();

router.post("/", login);

export default router;
