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
}

export default TaskService;
