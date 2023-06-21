import express from 'express';
import { verifyOwnerToken } from '../helpers/jwt_service.js';

import ownerController from '../app/controllers/ownerController.js';

const router = express.Router();

router.get('/store', verifyOwnerToken, ownerController.ShowStore);
router.get('/store/:id/employee', verifyOwnerToken, ownerController.ShowEmployeeByStoreId);
router.get('/show-request', verifyOwnerToken, ownerController.ShowRequest);
router.put('/accept-request', verifyOwnerToken, ownerController.AcceptRequest);
router.get('/find-freelancer', verifyOwnerToken, ownerController.FindFreelancerByPhone);
router.post('/send-request', verifyOwnerToken, ownerController.SendRequest);
router.get('/show-empl-gr-store', verifyOwnerToken, ownerController.ShowEmplGrByStore);
router.delete('/employee/delete', verifyOwnerToken, ownerController.DeleteEmployee);

export default router;
