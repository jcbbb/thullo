export type IError = {
  message: string;
  status_code: number;
  errors?: any;
};

export class DomainError extends Error implements IError {
  status_code: number;
  errors?: any;

  constructor(message: string = 'Internal server error', status_code: number = 500, errors?: any) {
    super();
    this.name = this.constructor.name;
    this.message = message!;
    this.status_code = status_code;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends DomainError {
  constructor(message = 'Bad request', status_code = 400) {
    super(message, status_code);
  }
}

export class InternalError extends DomainError {
  constructor(message = 'Internal server error', status_code = 500) {
    super(message, status_code);
  }
}

export class AuthorizationError extends DomainError {
  constructor(message = 'Unauthorized', status_code = 403) {
    super(message, status_code);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message = 'Authentication failed', status_code = 401) {
    super(message, status_code);
  }
}

export class ResourceNotFoundError extends DomainError {
  constructor(message = 'Resource not found', status_code = 404) {
    super(message, status_code);
  }
}

export class MailError extends DomainError {
  constructor(message = 'Something went wrong with Mail service', status_code = 502) {
    super(message, status_code);
  }
}

export class ValidationError extends DomainError {
  constructor(message = 'Validation failed', status_code = 422, errors?: any) {
    super(message, status_code, errors);
  }
}
