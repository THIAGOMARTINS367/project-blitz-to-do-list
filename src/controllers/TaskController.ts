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

  async addNewTask(service: ITaskService) {
    const { userData, body } = this.req;
    const result = await service.addNewTask(userData, body);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(201).json(result);
  }

  async updateTask(service: ITaskService) {
    const { userData, body, params: { taskId } } = this.req;
    const result = await service.updateTask(userData, Number(taskId), body);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(200).json(result);
  }

  async deleteTasks(service: ITaskService) {
    const { userData, body } = this.req;
    const result = await service.deleteTasks(userData, body);
    if (Object.keys(result).includes('error')) {
      return this.next(result);
    }
    this.res.status(200).json({ deletedTasks: result });
  }
}

export default TaskController;
