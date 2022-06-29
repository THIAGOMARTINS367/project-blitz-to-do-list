import { Request, Response, NextFunction } from 'express';
import IResponseError from '../interfaces/IResponseError';

export default (
  err: IResponseError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<{ message: string }> => {
  try {
    if (!err.error) {
      err.error = { code: 500, message: 'Internal Server Error!' };
      console.error('Error1 - Error in "error middleware" !');
    }
    const { code, message } = err.error;
    if (err.error) {
      return res.status(code).json({ message });
    }
    console.error('Error2 - Error in "error middleware" !');
    return res.status(500).json({ message: 'Internal Server Error !' });
  } catch (error) {
    console.error('Error3 - Error in "error middleware" !');
    return res.status(500).json({ message: 'Internal Server Error !' });
  }
};
