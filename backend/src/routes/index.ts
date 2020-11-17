import { Router } from 'express';
import auth from './auth';
import board from './board'
import user from './user';

const route = Router();

route.use('/auth', auth);
route.use('/boards', board)
route.use('users', user)

export default route;
