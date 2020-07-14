import { Request, Response, NextFunction } from 'express';

const { ErrorHandler } = require('../utils/errors');

const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.getErrorCode()).json(showError(err));
  }

  return res.status(500).json(showError(err));
};

const showError = (err: any): object => {
  return { status: 'error', message: err.message };
};

module.exports = handleErrors;
