import express from 'express';

import ownerController from '../app/controllers/ownerController.js';

const router = express.Router();

router.get('/', ownerController.Test);

export default router;
