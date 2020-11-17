import { Router, Response, Request } from 'express';
import { verifyToken } from '../utils'
import * as User from '../services/user';

const router = Router();

router.get('/profile', verifyToken, async (req: Request, res: Response) => {
    try {
        const { _id } = req.user;
        const user = await User.getUserById(_id)
        res.status(200).json({ user })
    } catch (err) {
        res.status(err.statusCode).json({ ...err });
    }
})

export default router;