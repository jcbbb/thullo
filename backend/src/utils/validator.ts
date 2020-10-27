import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

type ErrorParam = string | number;
type ErrorMessage = string;
type ErrorObject = Record<ErrorParam, ErrorMessage>;

export const emailValidationRules = () => [
  body('email')
    .notEmpty()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email should be valid'),
];

export const authCodeValidationRules = () => [
  body('authCode')
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage('Auth code must be 6 characters long and not empty'),
  body('email')
    .notEmpty()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email should be valid'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrors: ErrorObject[] = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    message: 'Validation failed',
    errors: extractedErrors,
  });
};
