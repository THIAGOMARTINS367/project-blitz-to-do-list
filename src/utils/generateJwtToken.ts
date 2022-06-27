import jwt from 'jsonwebtoken';
import superSecretJwt from '../contans';
import IUserData from '../interfaces/IUserData';

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
