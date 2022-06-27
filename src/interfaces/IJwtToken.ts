import IUserData from './IUserData';

interface IJwtToken {
  data: IUserData,
  iat: number,
  exp: number
}

export default IJwtToken;
