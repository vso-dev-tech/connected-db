const Router = require('express');

const router = Router();

import list from './list';
import submit from './submit';

router.use("/list", list);
router.use('/submit', submit);

export default router;
