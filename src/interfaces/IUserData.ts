import IUser from './IUser';

interface IUserData extends Omit<IUser, 'password'> {
  userId: number,
}

export default IUserData;
