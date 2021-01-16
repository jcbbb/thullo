import { Router } from 'express';
import { verify_token, validate } from '../utils';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/check-email', validate('email'), AuthController.check_email);
router.post('/temp-user', validate('email'), AuthController.temp_user);
router.post('/verify', validate('email', 'auth_code'), AuthController.verify);
router.post('/signup', validate('email', 'password', 'auth_code', 'name'), AuthController.signup);
router.post('/login', validate('email', 'password'), AuthController.login);

router.get('/me', verify_token, AuthController.me);

export default router;
