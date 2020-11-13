import { Router } from 'express';
import auth from './auth';
import board from './board'

const route = Router();

route.use('/auth', auth);
route.use('/boards', board)

export default route;
