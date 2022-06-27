import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/IUser';
import IUserLogin from '../interfaces/IUserLogin';
import IUserService from '../interfaces/IUserService';

class UserController {
  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  async addNewUser(service: IUserService) {
    const { body } = this.req;
    const user: IUser = body;
    const result = await service.addNewUser(user);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(201).json(result);
  }

  async userLogin(service: IUserService) {
    const { body } = this.req;
    const user: IUserLogin = body;
    const result = await service.userLogin(user);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(200).json(result);
  }
}

export default UserController;
