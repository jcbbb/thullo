import { Router, Response, Request } from 'express';
import { emailValidationRules, authCodeValidationRules, validate } from '../utils/validator';
import Auth from '../services/auth';

const router = Router();

router.post(
  '/check-email',
  emailValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await Auth.check(email);
      res.status(200).json({ message: 'Email is not taken', statusCode: 200 });
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
    }
  },
);

router.post('/temp-user', emailValidationRules(), validate, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await Auth.createTempUser(email);
    res.status(201).json({ message: 'Temporary user created for an hour.', statusCode: 201 });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  }
});

router.post('/verify', authCodeValidationRules(), validate, async (req: Request, res: Response) => {
  try {
    const { email, authCode } = req.body;
    await Auth.verify(email, authCode);
    setTimeout(() => {
      res.status(200).json({ message: 'Auth code verified', statusCode: 200 });
    }, 3000);
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  }
});
export default router;
