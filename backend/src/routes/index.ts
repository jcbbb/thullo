import { Router } from 'express';
import auth from './auth';

const route = Router();

route.use('/auth', auth);

export default route;
