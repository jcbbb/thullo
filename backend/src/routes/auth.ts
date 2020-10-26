import { Router, Response, Request } from 'express';
import { emailValidationRules, validate } from '../utils/validator';
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

export default router;
