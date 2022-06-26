import IUSer from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';

class UserService implements IUserService {
  constructor(private model: IUserModel) {}

  async addNewUser(user: IUSer): Promise<Omit<IUserData, 'password'>> {
    const newUser = await this.model.addNewUser(user);
    return newUser;
  }

  async userLogin(body: IUserLogin): Promise<string> {
    const userExist = await this.model.getUserByEmailAndPassword(body);
    console.log('userExist:', userExist);
    if (userExist.length === 1) {
      return 'Usuário existe !';
    }
    return 'Email ou Senha estão incorretos !';
  }
}


export default UserService;
