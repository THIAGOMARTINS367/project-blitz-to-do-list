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

  validateDeleteTasksFields({ tasks }: { tasks: number[] }): ValidationError | undefined {
    const { object, array } = this.joiTypes;
    const { error } = object.keys({
      tasks: array.not().empty().min(1).required(),
    }).validate({ tasks });
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
    if (typeof body !== 'object') {
      return { error: { code: 400, message: 'The request body must be an object!' } };
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
    const queryInjection: string[] = [];
    [taskId].forEach(() => queryInjection.push('?'));
    const taskExists: ITask[] = await this.model.getUserTaskById(userData, [taskId], queryInjection);
    if (!taskExists[0]) {
      return { error: { code: 400, message: `Task with id ${taskId} does not exist` } };
    }
    body.createdAt = taskExists[0].createdAt;
    const updatedTask = await this.model.updateTask(userData, taskId, body);
    return updatedTask;
  }

  async deleteTasks(userData: IUserData, body: { tasks: number[] }): Promise<number[] | IResponseError> {
    if (typeof body !== 'object' || !Object.keys(body).includes('tasks')) {
      return { error: {
        code: 400,
        message: 'The request body must be an object with just the "tasks" attribute!',
      } };
    }
    const validation = this.validateDeleteTasksFields(body);
    if (validation) {
      const validationType = validation.details[0].type;
      if (validationType === 'array.base') {
        return { error: { code: 422, message: validation.message } };
      }
      return { error: { code: 400, message: validation.message } };
    };
    if (!body.tasks.every((element) => typeof element === 'number')) {
      return { error: { code: 400, message: 'Task ids must be numbers!' } };
    }
    const { userId, firstName, lastName } = userData;
    const userExist = await this.validateUserExist(userId);
    if (!userExist) {
      return { error: { code: 404, message: `User ${firstName} ${lastName} does not exist!` } };
    }
    const mysqlInjection: string[] = [];
    body.tasks.forEach(() => mysqlInjection.push('?'));
    const tasksExists: ITask[] = await this.model.getUserTaskById(userData, body.tasks, mysqlInjection);
    const tasksExistsIds = tasksExists.map(({ taskId }) => taskId);
    for (let index = 0; index < body.tasks.length; index += 1) {
      if (!tasksExistsIds.includes(body.tasks[index])) {
        return { error: { code: 400, message: `Task with id ${body.tasks[index]} does not exist` } };
      }
    }
    const queryInjection: string[] = [];
    body.tasks.forEach(() => queryInjection.push('?'));
    const deletedTasks = await this.model.deleteTasks(userData, body.tasks, queryInjection);
    return deletedTasks;
  }
}
export default TaskService;
