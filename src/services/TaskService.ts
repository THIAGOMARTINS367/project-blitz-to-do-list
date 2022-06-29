import ITask from '../interfaces/ITask';
import ITaskModel from '../interfaces/ITaskModel';
import ITaskService from '../interfaces/ITaskService';
import IUserData from '../interfaces/IUserData';

class TaskService implements ITaskService {
  constructor(private model: ITaskModel) {}

  async getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'>> {
    const tasks = await this.model.getUserTaskList(userData);
    return tasks;
  }

  async addNewTask({ userId }: IUserData, body: ITask[]): Promise<{ message: string }> {
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
}

export default TaskService;
