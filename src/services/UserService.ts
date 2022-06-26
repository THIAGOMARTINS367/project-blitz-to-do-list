import Joi, { ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import IUser from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';
import IUserToken from '../interfaces/IUserToken';
import generateJwtToken from '../utils/generateJwtToken';

class UserService implements IUserService {
  constructor(
    private model: IUserModel,
    private joiTypes = Joi.types(),
    private adminFormatted: boolean = false,
  ) {}

  private validateAddNewUserFields({
    admin,
    firstName,
    lastName,
    email,
    password,
  }: IUser): ValidationError | undefined {
    const { object, string, boolean } = this.joiTypes;
    const { error } = object.keys({
      admin: boolean.not().empty().required(),
      firstName: string.not().empty().required(),
      lastName: string.not().empty().required(),
      email: string.email().not().empty().required(),
      password: string.not().empty().required(),
    }).validate({ admin, firstName, lastName, email, password });
    return error;
  }

  private validateUserLoginFields({
    email,
    password,
  }: IUserLogin): ValidationError | undefined {
    const { object, string } = this.joiTypes;
    const { error } = object.keys({
      email: string.email().not().empty().required(),
      password: string.not().empty().required(),
    }).validate({ email, password });
    return error;
  }

  async addNewUser(
    user: IUser,
  ): Promise<Omit<IUserData, 'password'> | IResponseError> {
    const validation: ValidationError | undefined = this.validateAddNewUserFields(user);
    if (validation) {
      const validationType = validation.details[0].type;
      if (validationType === 'string.base' || validationType === 'string.email') {
        return { error: { code: 422, message: validation.message } };
      }
      return { error: { code: 400, message: validation.message } };
    }
    const userExist = await this.model.getUserByEmail(user);
    if (userExist.length === 1) {
      return { error: { code: 409, message: 'User email already exists !' } };
    }
    const newUser = await this.model.addNewUser(user) as Omit<IUserToken, 'password'>;
    const token: string = generateJwtToken('7d', newUser);
    newUser.token = token;
    return newUser;
  }

  formatUserLoginAttribute({ admin }: IUser): boolean {
    if (admin === 1) {
      this.adminFormatted = true;
    }
    return this.adminFormatted;
  }

  async userLogin(body: IUserLogin): Promise<{ token: string } | IResponseError> {
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
      userExist[0].admin = this.formatUserLoginAttribute(userExist[0]);
      const token: string = generateJwtToken('7d', userExist[0]);
      return { token };
    }
    return { error: { code: 422, message: 'Incorrect email or password !' } };
  }
}

export default UserService;
