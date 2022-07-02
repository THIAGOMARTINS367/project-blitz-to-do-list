import Joi, { ArraySchema, ObjectSchema, StringSchema, ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import ITask from '../interfaces/ITask';
import ITaskModel from '../interfaces/ITaskModel';
import ITaskService from '../interfaces/ITaskService';
import IUserData from '../interfaces/IUserData';

class TaskService implements ITaskService {
  constructor(
    private model: ITaskModel,
    private joiTypes = Joi.types(),
    private requestBody: ITask[] | ITask | { tasks: number[] } = { tasks: [0] },
  ) { }

  requestBodyIsArray(): IResponseError | undefined {
    const body: ITask[] | ITask | { tasks: number[] } = this.requestBody;
    if (typeof body !== 'object' || !Array.isArray(body) || body.length === 0) {
      return {
        error: {
          code: 400,
          message: 'The request body must be an array with at least 1 element!',
        },
      };
    }
    return undefined;
  }

  requestBodyIsObject(): IResponseError | undefined {
    const body: ITask[] | ITask | { tasks: number[] } = this.requestBody;
    if (typeof body !== 'object' || Array.isArray(body)) {
      return {
        error: { code: 400, message: 'The request body must be an object that is not an array!' },
      };
    }
    return undefined;
  }

  validateFields({ taskContent, status }: ITask): undefined | IResponseError {
    const { object, string }: { object: ObjectSchema, string: StringSchema } = this.joiTypes;
    const { error }: { error: ValidationError | undefined } = object.keys({
      taskContent: string.not().empty().max(500)
        .required(),
      status: string.not().empty().valid('pendente', 'em andamento', 'pronto')
        .required(),
    }).validate({ taskContent, status });
    if (error) {
      const validationType: string = error.details[0].type;
      if (validationType === 'string.base') {
        return { error: { code: 422, message: error.message } };
      }
      return { error: { code: 400, message: error.message } };
    }
    return error as undefined;
  }

  validateDeleteTasksFields({
    tasks,
  }: { tasks: number[] }): undefined | IResponseError {
    const { object, array }: { object: ObjectSchema, array: ArraySchema } = this.joiTypes;
    const { error }: { error: ValidationError | undefined } = object.keys({
      tasks: array.not().empty().min(1)
        .required(),
    }).validate({ tasks });
    if (error) {
      const validationType: string = error.details[0].type;
      if (validationType === 'array.base') {
        return { error: { code: 422, message: error.message } };
      }
      return { error: { code: 400, message: error.message } };
    }
    if (!error && !tasks.every((element) => typeof element === 'number')) {
      return { error: { code: 400, message: 'Task ids must be numbers!' } };
    }
    return error as undefined;
  }

  async validateUserExist({
    userId,
    firstName,
    lastName,
  }: IUserData): Promise<IUserData | IResponseError> {
    const userExists: IUserData[] = await this.model.getUserById(userId);
    if (!userExists[0]) {
      return {
        error: {
          code: 404,
          message: `User ${firstName} ${lastName} does not exist!`,
        },
      };
    }
    return userExists[0];
  }

  async validateTaskExists(userData: IUserData, taskIds: number[]):
  Promise<ITask[] | IResponseError> {
    const queryInjection: string[] = [];
    taskIds.forEach(() => queryInjection.push('?'));
    const taskExists: ITask[] = await this.model.getUserTaskById(
      userData,
      taskIds,
      queryInjection,
    );
    const taskExistsIds: number[] = taskExists.map(({ taskId }) => taskId);
    for (let index = 0; index < taskIds.length; index += 1) {
      if (!taskExistsIds.includes(taskIds[index])) {
        return {
          error: { code: 400, message: `Task with id ${taskIds[index]} does not exist` },
        };
      }
    }
    return taskExists;
  }

  async getUserTaskList(
    userData: IUserData,
  ): Promise<Omit<ITask[], 'userId'> | IResponseError> {
    const userExist: IResponseError | IUserData = await this.validateUserExist(userData);
    if (Object.keys(userExist).includes('error')) {
      return userExist as IResponseError;
    }
    const tasks:
    IResponseError | Omit<ITask[], 'userId'> = await this.model.getUserTaskList(userData);
    return tasks;
  }

  addNewTaskJoiValidation(): IResponseError | undefined {
    const body = this.requestBody as ITask[];
    for (let index = 0; index < body.length; index += 1) {
      const validation: IResponseError | undefined = this.validateFields(body[index]);
      if (validation) return validation;
    }
    return undefined;
  }

  generateInjectionQuery(userId: number): {
    dataArray: (string | number)[], queryInjection: string[],
  } {
    const dataArray: (string | number)[] = [];
    const queryInjection: string[] = [];
    const body = this.requestBody as ITask[];
    body.forEach(({ taskContent, status }: ITask) => {
      dataArray.push(taskContent);
      dataArray.push(status);
      dataArray.push(userId);
      queryInjection.push('(?,?,?)');
    });
    return { dataArray, queryInjection };
  }

  async addNewTask(userData: IUserData, body: ITask[]):
  Promise<{ message: string } | IResponseError> {
    this.requestBody = body;
    const bodyValidation: IResponseError | undefined = this.requestBodyIsArray();
    if (bodyValidation) return bodyValidation;
    const joiValidation: IResponseError | undefined = this.addNewTaskJoiValidation();
    if (joiValidation) return joiValidation;
    const { userId }: { userId: number } = userData;
    const userExist: IResponseError | IUserData = await this.validateUserExist(userData);
    if (Object.keys(userExist).includes('error')) return userExist as IResponseError;
    const { dataArray, queryInjection }: {
      dataArray: (string | number)[], queryInjection: string[],
    } = this.generateInjectionQuery(userId);
    const tasksData: (string | number)[] = [...dataArray];
    const message: { message: string } = await this.model.addNewTask(tasksData, queryInjection);
    return message;
  }

  async updateTask(
    userData: IUserData,
    taskId: number,
    body: ITask,
  ): Promise<ITask | IResponseError> {
    this.requestBody = body;
    const bodyValidation: IResponseError | undefined = this.requestBodyIsObject();
    if (bodyValidation) return bodyValidation;
    const joiValidation: IResponseError | undefined = this.validateFields(body);
    if (joiValidation) return joiValidation;
    const userExist: IUserData | IResponseError = await this.validateUserExist(userData);
    if (Object.keys(userExist).includes('error')) return userExist as IResponseError;
    const taskExists: ITask[] | IResponseError = await this.validateTaskExists(userData, [taskId]);
    if (Object.keys(taskExists).includes('error')) return taskExists as IResponseError;
    const task = taskExists as ITask[];
    this.requestBody.createdAt = task[0].createdAt as Date;
    const updatedTask: ITask | IResponseError = await this.model
      .updateTask(userData, taskId, this.requestBody);
    return updatedTask;
  }

  async deleteTasks(userData: IUserData, body: { tasks: number[] }):
  Promise<number[] | IResponseError> {
    this.requestBody = body;
    const bodyValidation: IResponseError | undefined = this.requestBodyIsObject();
    if (bodyValidation) return bodyValidation;
    const validation: IResponseError | undefined = this.validateDeleteTasksFields(body);
    if (validation) return validation;
    const userExist: IResponseError | IUserData = await this.validateUserExist(userData);
    if (Object.keys(userExist).includes('error')) return userExist as IResponseError;
    const taskExists:
    IResponseError | ITask[] = await this.validateTaskExists(userData, body.tasks);
    if (Object.keys(taskExists).includes('error')) return taskExists as IResponseError;
    const queryInjection: string[] = [];
    body.tasks.forEach(() => queryInjection.push('?'));
    const deletedTasks: number[] = await this.model
      .deleteTasks(userData, body.tasks, queryInjection);
    return deletedTasks;
  }
}
export default TaskService;
