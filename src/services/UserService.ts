import IUSer from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';

class UserService implements IUserService {
  constructor(private model: IUserModel) {}

  async addNewUser(user: IUSer): Promise<IUserData> {
    const newUser = await this.model.addNewUser(user);
    return newUser;
  }
}

export default UserService;
