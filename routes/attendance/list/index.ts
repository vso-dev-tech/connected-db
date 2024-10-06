
const Router = require('express');

import list from "middleware/attendance/list";

const router = Router();

router.post("/", list);

export default router;
