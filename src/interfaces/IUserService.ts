import IResponseError from './IResponseError';
import IUSer from './IUser';
import IUserData from './IUserData';
import IUserLogin from './IUserLogin';

interface IUserService {
  addNewUser(user: IUSer): Promise<Omit<IUserData, 'password'> | IResponseError>,
  userLogin({ email, password }: IUserLogin): Promise<{ token: string } | IResponseError>,
}

export default IUserService;
