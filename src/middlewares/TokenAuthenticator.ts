import { Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import superSecretJwt from '../contans';
import IJwtToken from '../interfaces/IJwtToken';
import IUserData from '../interfaces/IUserData';

class TokenAuthenticator {
  constructor(
    private req: Request,
    private next: NextFunction,
  ) {}

  validateJwtToken(): void {
    const { headers } = this.req;
    const { authorization } = headers;
    const token: string | undefined = authorization;
    if (!token) {
      return this.next({ error: { code: 401, message: 'Token not found' } });
    }
    try {
      const decoded: string | JwtPayload = jwt.verify(token, superSecretJwt);
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
