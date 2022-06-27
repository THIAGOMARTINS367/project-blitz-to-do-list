import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import superSecretJwt from '../contans';
import IJwtToken from '../interfaces/IJwtToken';
import IUserData from '../interfaces/IUserData';

class TokenAuthenticator {
  constructor(
    private req: Request,
    private next: NextFunction,
  ) {}

  validateJwtToken() {
    const { headers } = this.req;
    const { authorization: token } = headers;
    if (!token) {
      return this.next({ error: { code: 401, message: 'Token not found' } });
    }
    try {
      const decoded = jwt.verify(token, superSecretJwt);
      const { data } = decoded as IJwtToken;
      const userData = { ...data } as IUserData;
      this.req.userData = { ...userData };
      this.next();
    } catch (error) {
      this.next({ error: { code: 401, message: 'Invalid token' } });
    }
  }
}

export default TokenAuthenticator;
