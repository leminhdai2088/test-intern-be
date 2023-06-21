import express from 'express';
import { verifyFreelancerToken } from '../helpers/jwt_service.js';

import freelancerController from '../app/controllers/freelancerController.js';

const router = express.Router();

router.get('/store', verifyFreelancerToken, freelancerController.ShowStore);
router.post('/send-request/:id', verifyFreelancerToken, freelancerController.SendRequest);
router.get('/show-request', verifyFreelancerToken, freelancerController.ShowRequest);
router.put('/response-request', verifyFreelancerToken, freelancerController.ResponseRequest);

export default router;
