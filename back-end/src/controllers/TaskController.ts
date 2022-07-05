import { Request, Response, NextFunction } from 'express';
import IResponseError from '../interfaces/IResponseError';
import ITask from '../interfaces/ITask';
import ITaskService from '../interfaces/ITaskService';
import IUserData from '../interfaces/IUserData';

class TaskController {
  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  async getUserTaskList(service: ITaskService):
  Promise<void | Response<Omit<ITask[], 'userId'> | IResponseError>> {
    const user: IUserData = this.req.userData;
    const result:
    Omit<ITask[], 'userId'> | IResponseError = await service.getUserTaskList(user);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(200).json(result);
  }

  async addNewTask(service: ITaskService):
  Promise<void | Response<IResponseError | { message: string }>> {
    const user: IUserData = this.req.userData;
    const requestBody: ITask[] = this.req.body;
    const result: IResponseError | {
      message: string,
    } = await service.addNewTask(user, requestBody);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(201).json(result);
  }

  async updateTask(service: ITaskService):
  Promise<void | Response<ITask | IResponseError>> {
    const user: IUserData = this.req.userData;
    const requestBody: ITask = this.req.body;
    const id: string = this.req.params.taskId;
    const result:
    ITask | IResponseError = await service.updateTask(user, Number(id), requestBody);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(200).json(result);
  }

  async deleteTasks(service: ITaskService):
  Promise<void | Response<IResponseError | number[]>> {
    const user: IUserData = this.req.userData;
    const requestBody: { tasks: number[] } = this.req.body;
    const result:
    IResponseError | number[] = await service.deleteTasks(user, requestBody);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    return this.res.status(200).json({ deletedTasks: result });
  }
}

export default TaskController;
