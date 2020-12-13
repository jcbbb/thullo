import { Router } from 'express';
import { validate } from '../utils/validator';
import { verifyToken } from '../utils';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/check-email', validate('email'), AuthController.checkEmail);
router.post('/temp-user', validate('email'), AuthController.tempUser);
router.post('/verify', validate('email', 'authCode'), AuthController.verify);
router.post('/signup', validate('email', 'password', 'authCode'), AuthController.signup);
router.post('/login', validate('email', 'password'), AuthController.login);

router.get('/me', verifyToken, AuthController.me);

export default router;
