import { Request, Response, NextFunction } from 'express';
import IResponseError from '../interfaces/IResponseError';

export default (
  err: IResponseError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<{ message: string }> => {
  try {
    const { code, message } = err.error;
    if (err.error) return res.status(code).json({ message });
    return res.status(500).json({ message: 'Internal Server Error !' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error !' });
  }
};
