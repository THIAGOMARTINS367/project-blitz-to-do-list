import IUSer from './IUser';

interface IUserLogin extends Omit<IUSer, 'admin' | 'firstName' | 'lastName'> {}

export default IUserLogin;
