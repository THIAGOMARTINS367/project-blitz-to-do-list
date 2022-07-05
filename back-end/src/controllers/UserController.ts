import { Request, Response, NextFunction } from 'express';
import IResponseError from '../interfaces/IResponseError';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';
import IUserLogin from '../interfaces/IUserLogin';
import IUserService from '../interfaces/IUserService';
import IUserToken from '../interfaces/IUserToken';

class UserController {
  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  async addNewUser(service: IUserService):
  Promise<void | Response<IResponseError | IUserToken>> {
    const newUser: IUser = this.req.body;
    const result = await service.addNewUser(newUser) as IUserToken | IResponseError;
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(201).json(result);
  }

  async userLogin(service: IUserService):
  Promise<void | Response<IResponseError | IToken>> {
    const user: IUserLogin = this.req.body;
    const result: IResponseError | IToken = await service.userLogin(user);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(200).json(result);
  }
}

export default UserController;
