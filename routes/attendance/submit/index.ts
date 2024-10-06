import submit from "middleware/attendance/submit";

const Router = require('express');


const router = Router();

router.post("/", submit);

export default router;
