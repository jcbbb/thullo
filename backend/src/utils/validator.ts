import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

type ErrorKey = string | number;
type ErrorValue = string;
type ErrorObject = Record<ErrorKey, ErrorValue>;

type RuleNames = 'email' | 'password' | 'auth_code' | 'name';

const email_validation_rules = () => [
  body('email')
    .notEmpty()
    .isString()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email should be valid'),
];

const auth_code_validation_rules = () => [
  body('auth_code')
    .notEmpty()
    .withMessage('Auth code cannot be empty')
    .isString()
    .withMessage('Auth code must string')
    .isLength({ min: 6, max: 6 })
    .withMessage('Auth code must be 6 characters long'),
];

const password_validation_rules = () => [
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const name_validation_rules = () => [body('name').notEmpty().withMessage('Name is required')];

const rules = {
  email: email_validation_rules,
  password: password_validation_rules,
  auth_code: auth_code_validation_rules,
  name: name_validation_rules,
};

export const validate = (...rule_names: RuleNames[]) => {
  const validations = rule_names.map((rule_name) => rules[rule_name]());

  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const extracted_errors: ErrorObject = {};

    errors.array().map((err) => (extracted_errors[err.param] = err.msg));

    return next(new ValidationError('Validation Failed', 422, extracted_errors));
  };
};
