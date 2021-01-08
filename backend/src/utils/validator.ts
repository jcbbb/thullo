import { body, validationResult, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors';

type ErrorParam = string | number;
type ErrorMessage = string;
type ErrorObject = Record<ErrorParam, ErrorMessage>;

type RuleNames = 'email' | 'password' | 'authCode' | 'name' | 'limit' | 'offset';

const limitParamRules = () => [
  param('limit').isNumeric().withMessage('Limit param should be numeric').optional(),
];

const offsetParamRules = () => [
  param('offset').isNumeric().optional().withMessage('Offset param should be numeric').optional(),
];

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

const nameValidationRules = () => [body('name').notEmpty().withMessage('Name is required')];

const rules = {
  email: emailValidationRules,
  password: passwordValidationRules,
  authCode: authCodeValidationRules,
  name: nameValidationRules,
  limit: limitParamRules,
  offset: offsetParamRules,
};

export const validate = (...ruleNames: RuleNames[]) => {
  let validations: any = [];
  ruleNames.forEach((ruleName) => {
    validations = [...validations, ...rules[ruleName]()];
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const extractedErrors: ErrorObject = {};

    errors.array().map((err) => (extractedErrors[err.param] = err.msg));

    return next(new ValidationError('Validation Failed', 422, extractedErrors));
  };
};
