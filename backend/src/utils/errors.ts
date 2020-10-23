class DomainError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends DomainError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
}

export class InternalError extends DomainError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }
}

export class AuthorizationError extends DomainError {
  constructor(message: string, statusCode: number = 403) {
    super(message, statusCode);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string, statusCode: number = 401) {
    super(message, statusCode);
  }
}

export class ResourceNotFoundError extends DomainError {
  constructor(message: string, statusCode: number = 404) {
    super(message, statusCode);
  }
}
