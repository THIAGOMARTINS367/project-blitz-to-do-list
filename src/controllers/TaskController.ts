import { Request, Response, NextFunction } from 'express';
import ITaskService from '../interfaces/ITaskService';

class TaskController {
  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  async getUserTaskList(service: ITaskService) {
    const { userData } = this.req;
    const result = await service.getUserTaskList(userData);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(200).json(result);
  }
}

export default TaskController;
