import { Router, Response, Request } from 'express';
import { validationFor, validate } from '../utils/validator';
import { setCookies } from '../utils';
import * as Auth from '../services/auth';

const router = Router();

router.post(
  '/check-email',
  validationFor('email'),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await Auth.check(email);
      res.status(200).json({ message: 'Email is not taken', statusCode: 200 });
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
    }
  }
);

router.post('/temp-user', validationFor('email'), validate, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await Auth.createTempUser(email);
    res.status(201).json({ message: 'Temporary user created for an hour.', statusCode: 201 });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  }
});

router.post(
  '/verify',
  validationFor('email', 'authCode'),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email, authCode } = req.body;
      await Auth.verify(email, authCode);
      res.status(200).json({ message: 'Auth code verified', statusCode: 200 });
    } catch (err) {
      res.status(err.statusCode).json({ ...err });
    }
  }
);

router.post(
  '/signup',
  validationFor('email', 'password', 'authCode'),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email, password, name, authCode } = req.body;
      const { accessToken } = await Auth.signup(email, password, name, authCode);

      setCookies(res, accessToken)
      res.status(201).json({ message: 'User created', statusCode: 201 });
    } catch (err) {
      res.status(err.statusCode).json({ ...err });
    }
  }
);

router.post(
  '/login',
  validationFor('email', 'password'),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      await Auth.login(email, password);
      res.status(200).json({ message: 'Logged in', statusCode: 200 });
    } catch (err) {
      res.status(err.statusCode).json({ ...err });
    }
  }
);

export default router;
