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
      res.status(200).end();
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
    }
  },
);

router.post('/temp-user', emailValidationRules(), validate, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await Auth.createTempUser(email);
    res.status(201).end();
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  }
});

router.post('/verify', authCodeValidationRules(), validate, async (req: Request, res: Response) => {
  try {
    const { email, authCode } = req.body;
    await Auth.verify(email, authCode);
    setTimeout(() => {
      res.status(200).end();
    }, 3000);
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
  }
});
export default router;
