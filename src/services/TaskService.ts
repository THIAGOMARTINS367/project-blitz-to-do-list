import Joi, { ValidationError } from 'joi';
import IResponseError from '../interfaces/IResponseError';
import ITask from '../interfaces/ITask';
import ITaskModel from '../interfaces/ITaskModel';
import ITaskService from '../interfaces/ITaskService';
import IUserData from '../interfaces/IUserData';

class TaskService implements ITaskService {
  constructor(private model: ITaskModel, private joiTypes = Joi.types()) {}

  validateAddNewTaskFields({ taskContent, status }: ITask): ValidationError | undefined {
    const { object, string } = this.joiTypes;
    const { error } = object.keys({
      taskContent: string.not().empty().max(500).required(),
      status: string.not().empty().valid('pendente', 'em andamento', 'pronto').required(),
    }).validate({ taskContent, status });
    return error;
  }

  async getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'>> {
    const tasks = await this.model.getUserTaskList(userData);
    return tasks;
  }

  async addNewTask({ userId }: IUserData, body: ITask[]): Promise<{ message: string } | IResponseError> {
    for (let index = 0; index < body.length; index += 1) {
      const validation = this.validateAddNewTaskFields(body[index]);
      if (validation) {
        const validationType = validation.details[0].type;
        if (validationType === 'string.base') {
          return { error: { code: 422, message: validation.message } };
        }
        return { error: { code: 400, message: validation.message } };
      };
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

  async updateTask(userData: IUserData, taskId: number, body: ITask): Promise<{ message: string }> {
    const message = await this.model.updateTask(userData, taskId, body);
    return message;
  }
}
export default TaskService;
