import jwt from 'jsonwebtoken';
import IUserData from '../interfaces/IUserData';

const superSecretJwt: string = process.env.JWT_SECRET || 'default_password';

const generateJwtToken = (
  validity: string,
  paylod: Omit<IUserData, 'password'>,
): string => {
  const jwtConfig: object = {
    expiresIn: validity,
    algorithm: 'HS256',
  };
  return jwt.sign({ data: paylod }, superSecretJwt, jwtConfig);
};

export default generateJwtToken;
