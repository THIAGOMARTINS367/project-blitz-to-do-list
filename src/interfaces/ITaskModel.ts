import ITask from './ITask';
import ITaskService from './ITaskService';
import IUserData from './IUserData';

interface ITaskModel extends Omit<ITaskService, 'addNewTask'> {
  serialize(): Omit<ITask[], 'userId'>;
  addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[]
  ): Promise<{ message: string }>;
  getUserTaskById(userData: IUserData, taskId: number): Promise<ITask[]>;
  getUserById(userId: number): Promise<Omit<IUserData[], 'password'>>;
}

export default ITaskModel;
