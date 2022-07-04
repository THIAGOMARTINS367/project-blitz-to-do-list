import Joi, { BooleanSchema, ObjectSchema, StringSchema, ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import IToken from '../interfaces/IToken';
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
    private requestBody: IUser | IUserLogin = { email: '', password: '' },
    private validation: ValidationError | undefined = undefined,
  ) {}

  requestBodyIsObject(): IResponseError | undefined {
    const body: IUser | IUserLogin = this.requestBody;
    if (typeof body !== 'object' || Array.isArray(body)) {
      return {
        error: { code: 400, message: 'The request body must be an object that is not an array!' },
      };
    }
    return undefined;
  }

  private validateAddNewUserFields({
    admin,
    firstName,
    lastName,
    email,
    password,
  }: IUser): ValidationError | undefined {
    const { object, string, boolean }: {
      object: ObjectSchema, string: StringSchema, boolean: BooleanSchema
    } = this.joiTypes;
    const { error }: { error: ValidationError | undefined } = object.keys({
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
    const { object, string }: { object: ObjectSchema, string: StringSchema } = this.joiTypes;
    const { error }: { error: ValidationError | undefined } = object.keys({
      email: string.email().not().empty().required(),
      password: string.not().empty().required(),
    }).validate({ email, password });
    return error;
  }
  
  validateReturnJoi(): IResponseError | undefined {
    if (this.validation) {
      const validationType: string = this.validation.details[0].type;
      if (validationType === 'string.base' || validationType === 'string.email') {
        return { error: { code: 422, message: this.validation.message } };
      }
      return { error: { code: 400, message: this.validation.message } };
    }
    return this.validation;
  }

  async addNewUser(
    user: IUser,
  ): Promise<IUserToken | IResponseError> {
    this.requestBody = user;
    const bodyValidation: IResponseError | undefined = this.requestBodyIsObject();
    if (bodyValidation) return bodyValidation;
    const joiValidation: ValidationError | undefined = this.validateAddNewUserFields(user);
    this.validation = joiValidation;
    const validation: IResponseError | undefined = this.validateReturnJoi();
    if (validation) return validation;
    const userExist: IUserData[] = await this.model.getUserByEmail(user);
    if (userExist.length === 1) {
      return { error: { code: 409, message: 'User email already exists !' } };
    }
    const newUser = await this.model.addNewUser(user) as IUserData;
    const token: string = generateJwtToken(newUser);
    const newUserWithToken: IUserToken = { ...newUser, token };
    return newUserWithToken;
  }

  async userLogin(body: IUserLogin): Promise<IToken | IResponseError> {
    this.requestBody = body;
    const bodyValidation: IResponseError | undefined = this.requestBodyIsObject();
    if (bodyValidation) return bodyValidation;
    const joiValidation: ValidationError | undefined = this.validateUserLoginFields(body);
    this.validation = joiValidation;
    const validation: IResponseError | undefined = this.validateReturnJoi();
    if (validation) return validation;
    const userExist: IUserData[] = await this.model.getUserByEmailAndPassword(body);
    if (userExist.length === 1) {    
      userExist[0].admin = userExist[0].admin === 1 as number | boolean;
      const token: string = generateJwtToken(userExist[0]);
      return { token } as IToken;
    }
    return { error: { code: 422, message: 'Incorrect email or password !' } };
  }
}

export default UserService;
