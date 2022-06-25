import IUSer from './IUser';
import IUserData from './IUserData';

interface IUserService {
  addNewUser(user: IUSer): Promise<IUserData>,
}

export default IUserService;
