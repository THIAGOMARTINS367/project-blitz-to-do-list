import IUserData from './IUserData';
import IUserLogin from './IUserLogin';
import IUserService from './IUserService';

interface IUserModel extends Omit<IUserService, 'userLogin'> {
  getUserByEmailAndPassword({
    email, password,
  }: IUserLogin): Promise<Omit<IUserData[], 'password'>>,

  getUserByEmail({
    email,
  }: IUserLogin): Promise<Omit<IUserData[], 'password'>>,
}

export default IUserModel;
