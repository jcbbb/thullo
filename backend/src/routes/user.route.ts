import { Router } from 'express';
import { verify_token, validate } from '../utils';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/profile', verify_token, UserController.get_profile);
router.get('/', UserController.get_all_users);
router.get('/:user_id', UserController.get_user_by_id);
router.delete('/:user_id', verify_token, UserController.delete_user_by_id);
router.patch('/:user_id', UserController.patch_user_by_id);

export default router;
