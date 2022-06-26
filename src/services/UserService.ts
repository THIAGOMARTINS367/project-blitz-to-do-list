import Joi, { ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import IUSer from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';

const { object, string, boolean } = Joi.types();

class UserService implements IUserService {
  constructor(private model: IUserModel) {}

  validateAddNewUserFields({
    admin,
    firstName,
    lastName,
    email,
    password,
  }: IUSer): ValidationError | undefined {
    const { error } = object.keys({
      admin: boolean.not().empty().required(),
      firstName: string.not().empty().required(),
      lastName: string.not().empty().required(),
      email: string.email().not().empty().required(),
      password: string.not().empty().required(),
    }).validate({ admin, firstName, lastName, email, password });
    return error;
  }

  validateUserLoginFields({ email, password }: IUserLogin): ValidationError | undefined {
    const { error } = object.keys({
      email: string.email().not().empty().required(),
      password: string.not().empty().required(),
    }).validate({ email, password });
    return error;
  }

  async addNewUser(user: IUSer): Promise<Omit<IUserData, 'password'> | IResponseError> {
    const validation: ValidationError | undefined = this.validateAddNewUserFields(user);
    if (validation) {
      const validationType = validation.details[0].type;
      if (validationType === 'string.base' || validationType === 'string.email') {
        return { error: { code: 422, message: validation.message } };
      }
      return { error: { code: 400, message: validation.message } };
    }
    const userExist = await this.model.getUserByEmail(user);
    if (userExist) {
      return { error: { code: 409, message: 'User email already exists !' } };
    }
    const newUser = await this.model.addNewUser(user);
    return newUser;
  }

  async userLogin(body: IUserLogin): Promise<string | IResponseError> {
    const validation: ValidationError | undefined = this.validateUserLoginFields(body);
    if (validation) {
      const validationType = validation.details[0].type;
      if (validationType === 'string.base' || validationType === 'string.email') {
        return { error: { code: 422, message: validation.message } };
      }
      return { error: { code: 400, message: validation.message } };
    }
    const userExist = await this.model.getUserByEmailAndPassword(body);
    if (userExist.length === 1) {
      if (userExist[0].admin === 1) {
        userExist[0].admin = true;
      } else {
        userExist[0].admin = false;
      }
      return 'Usuário existe !';
    }
    return 'Email ou Senha estão incorretos !';
  }
}


export default UserService;
