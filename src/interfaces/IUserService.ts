import IUSer from './IUser';
import IUserData from './IUserData';
import IUserLogin from './IUserLogin';

interface IUserService {
  addNewUser(user: IUSer): Promise<Omit<IUserData, 'password'>>,
  userLogin({ email, password }: IUserLogin): Promise<string>,
}

export default IUserService;
