import { Router } from 'express';
import { verify_token } from '../utils';
import * as BoardController from '../controllers/board.controller';

const router = Router();

router.post('/', verify_token, BoardController.create);
router.get('/', verify_token, BoardController.get_all_user_boards);
router.get('/:board_id', verify_token, BoardController.get_single);

export default router;
