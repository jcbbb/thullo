import { Router } from 'express';
import { verifyToken, validate } from '../utils';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/profile', verifyToken, UserController.getProfile);
router.get('/', validate('limit', 'offset'), UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.delete('/:userId', verifyToken, UserController.deleteUserById);
router.patch('/:userId', UserController.patchUserById);

export default router;
