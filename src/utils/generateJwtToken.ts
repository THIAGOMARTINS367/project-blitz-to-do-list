import jwt from 'jsonwebtoken';
import IUserData from '../interfaces/IUserData';

const generateJwtToken = (
  validity: string,
  paylod: Omit<IUserData, 'password'>,
  superSecret: string,
): string => {
  const jwtConfig: object = {
    expiresIn: validity,
    algorithm: 'HS256',
  };
  return jwt.sign({ data: paylod }, superSecret, jwtConfig);
};

export default generateJwtToken;
