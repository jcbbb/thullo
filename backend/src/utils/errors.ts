export type IError = {
  message: string;
  statusCode: number;
  errors?: any;
};

class DomainError extends Error implements IError {
  statusCode: number;
  errors?: any;

  constructor(message: string = 'Internal server error', statusCode: number = 500, errors?: any) {
    super();
    this.name = this.constructor.name;
    this.message = message!;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends DomainError {
  constructor(message = 'Bad request', statusCode = 400) {
    super(message, statusCode);
  }
}

export class InternalError extends DomainError {
  constructor(message = 'Internal server error', statusCode = 500) {
    super(message, statusCode);
  }
}

export class AuthorizationError extends DomainError {
  constructor(message = 'Unauthorized', statusCode = 403) {
    super(message, statusCode);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message = 'Authentication failed', statusCode = 401) {
    super(message, statusCode);
  }
}

export class ResourceNotFoundError extends DomainError {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message, statusCode);
  }
}

export class MailError extends DomainError {
  constructor(message = 'Something went wrong with Mail service', statusCode = 502) {
    super(message, statusCode);
  }
}

export class ValidationError extends DomainError {
  constructor(message = 'Validation failed', statusCode = 422, errors?: any) {
    super(message, statusCode, errors);
  }
}
