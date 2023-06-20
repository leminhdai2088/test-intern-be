import express from 'express';

import siteController from '../app/controllers/siteController.js';

const router = express.Router();

router.post('/sign-up', siteController.SignUp);
router.patch('/verify-email', siteController.VerifyEmail);
router.post('/login', siteController.Login);

export default router;
