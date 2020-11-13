import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

type ErrorParam = string | number;
type ErrorMessage = string;
type ErrorObject = Record<ErrorParam, ErrorMessage>;

type RuleNames = 'email' | 'password' | 'authCode';

const emailValidationRules = () => [
  body('email')
    .notEmpty()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email should be valid'),
];

const authCodeValidationRules = () => [
  body('authCode')
    .notEmpty()
    .withMessage('Auth code cannot be empty')
    .isString()
    .withMessage('Auth code must string')
    .isLength({ min: 6, max: 6 })
    .withMessage('Auth code must be 6 characters long'),
];

const passwordValidationRules = () => [
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const rules = {
  email: emailValidationRules,
  password: passwordValidationRules,
  authCode: authCodeValidationRules,
};

export const validationFor = (...ruleNames: RuleNames[]) => {
  let validations: any = [];
  ruleNames.forEach((ruleName) => {
    validations = [...validations, ...rules[ruleName]()];
  });

  return validations;
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrors: ErrorObject[] = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return next(new ValidationError('Validation Failed', 422, extractedErrors))
};
