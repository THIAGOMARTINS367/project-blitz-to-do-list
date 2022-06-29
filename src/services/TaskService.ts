import Joi, { ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import ITask from '../interfaces/ITask';
import ITaskModel from '../interfaces/ITaskModel';
import ITaskService from '../interfaces/ITaskService';
import IUserData from '../interfaces/IUserData';

class TaskService implements ITaskService {
  constructor(private model: ITaskModel, private joiTypes = Joi.types()) {}

  validateFields({ taskContent, status }: ITask): ValidationError | undefined {
    const { object, string } = this.joiTypes;
    const { error } = object.keys({
      taskContent: string.not().empty().max(500).required(),
      status: string.not().empty().valid('pendente', 'em andamento', 'pronto').required(),
    }).validate({ taskContent, status });
    return error;
  }

  async validateUserExist(userId: number): Promise<Omit<IUserData, 'password'>> {
    const userExists = await this.model.getUserById(userId);
    return userExists[0];
  }

  async getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'> | IResponseError> {
    const { userId, firstName, lastName } = userData;
    const userExist = await this.validateUserExist(userId);
    if (!userExist) {
      return { error: { code: 404, message: `User ${firstName} ${lastName} does not exist!` } };
    }
    const tasks = await this.model.getUserTaskList(userData);
    return tasks;
  }

  async addNewTask({ userId, firstName, lastName }: IUserData, body: ITask[]): Promise<{ message: string } | IResponseError> {
    if (typeof body !== 'object' || !Array.isArray(body) || body.length === 0) {
      return { error: { code: 400, message: 'Request body must be an array with at least 1 object!' } };
    }
    for (let index = 0; index < body.length; index += 1) {
      const validation = this.validateFields(body[index]);
      if (validation) {
        const validationType = validation.details[0].type;
        if (validationType === 'string.base') {
          return { error: { code: 422, message: validation.message } };
        }
        return { error: { code: 400, message: validation.message } };
      };
    }
    const userExist = await this.validateUserExist(userId);
    if (!userExist) {
      return { error: { code: 404, message: `User ${firstName} ${lastName} does not exist!` } };
    }
    const tasksData: (string | number)[] = [];
    const queryInjection: string[] = [];
    body.forEach(({ taskContent, status }: ITask) => {
      tasksData.push(taskContent);
      tasksData.push(status);
      tasksData.push(userId);
      queryInjection.push('(?,?,?)');
    });
    const message = await this.model.addNewTask(tasksData, queryInjection);
    return message;
  }

  async updateTask(userData: IUserData, taskId: number, body: ITask): Promise<ITask | IResponseError> {
    const { userId, firstName, lastName } = userData;
    if (typeof body !== 'object' || Object.keys(body).length === 0) {
      return { error: { code: 400, message: 'Request body must be an array with at least 1 object!' } };
    }
    const validation = this.validateFields(body);
    if (validation) {
      const validationType = validation.details[0].type;
      if (validationType === 'string.base') {
        return { error: { code: 422, message: validation.message } };
      }
      return { error: { code: 400, message: validation.message } };
    };
    const userExist = await this.validateUserExist(userId);
    if (!userExist) {
      return { error: { code: 404, message: `User ${firstName} ${lastName} does not exist!` } };
    }
    const taskExists: ITask[] = await this.model.getUserTaskById(userData, taskId);
    if (!taskExists[0]) {
      return { error: { code: 400, message: `Task with id ${taskId} does not exist` } };
    }
    body.createdAt = taskExists[0].createdAt;
    const updatedTask = await this.model.updateTask(userData, taskId, body);
    return updatedTask;
  }
}
export default TaskService;
