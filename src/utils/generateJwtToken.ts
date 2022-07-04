import jwt from 'jsonwebtoken';
import superSecretJwt, { tokenValidity } from '../contans';
import IUserData from '../interfaces/IUserData';

const generateJwtToken = (
  paylod: IUserData,
): string => {
  const jwtConfig: object = {
    expiresIn: tokenValidity,
    algorithm: 'HS256',
  };
  return jwt.sign({ data: paylod }, superSecretJwt, jwtConfig);
};

export default generateJwtToken;
