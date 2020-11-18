import { Router, Response, Request } from 'express';
import { verifyToken } from '../utils'
import * as BoardController from '../controllers/board'

const router = Router();

router.post('/', verifyToken, BoardController.create)
router.get('/', verifyToken, BoardController.getAllUserBoards)
router.get('/:boardId', verifyToken, BoardController.getSingle)

export default router;