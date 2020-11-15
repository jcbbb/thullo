import { Router, Response, Request } from 'express';
import { verifyToken } from '../utils'
import * as Board from '../services/board';

const router = Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const { _id } = req.user;
        const { title, cover_photo_url, status } = req.body;
        await Board.create({ title, visibility: status, cover_photo_url, creator: _id })
        res.status(201).json({ message: 'Board created', statusCode: 201 })
    } catch (err) {
        res.status(err.statusCode).json({ ...err });
    }
})

export default router;