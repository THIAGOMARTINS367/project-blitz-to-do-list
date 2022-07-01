import IUser from './IUser';

interface IUserLogin extends Omit<IUser, 'admin' | 'firstName' | 'lastName'> {
  email: string,
  password: string,
}

export default IUserLogin;
