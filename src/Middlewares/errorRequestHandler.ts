import { ErrorRequestHandler } from 'express';
import HttpError from '../Errors';

const errorRequestHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorRequestHandler;
