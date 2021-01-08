import { Router } from 'express';
import auth from './auth.route';
import board from './board.route';
import user from './user.route';

const route = Router();

route.use('/auth', auth);
route.use('/boards', board);
route.use('/users', user);

export default route;
