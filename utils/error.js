export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = message;
    this.statusCode = 400;

    Error.captureStackTrace(this, this.constructor);
  }
}
