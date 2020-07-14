class ErrorHandler extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getErrorCode(): number {
    if (this instanceof BadRequest) return 400;
    if (this instanceof NotFound) return 404;
    return 500;
  }
}

class BadRequest extends ErrorHandler {}
class NotFound extends ErrorHandler {}

module.exports = {
  ErrorHandler,
  BadRequest,
  NotFound,
};
