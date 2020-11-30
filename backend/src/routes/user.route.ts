import { Router } from 'express';
import { verifyToken } from '../utils';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/profile', verifyToken, UserController.profile);

export default router;
