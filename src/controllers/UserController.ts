import { Request, Response, NextFunction } from 'express';
import IUSer from '../interfaces/IUser';
import IUserService from '../interfaces/IUserService';

class UserController {
  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  async addNewUser(service: IUserService) {
    const body: IUSer = this.req.body;
    const result = await service.addNewUser(body);
    this.res.status(201).json(result);
  }
}

export default UserController;
