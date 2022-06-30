import ITask from './ITask';
import ITaskService from './ITaskService';
import IUserData from './IUserData';

interface ITaskModel extends Omit<ITaskService, 'addNewTask' | 'deleteTasks'> {
  serialize(): Omit<ITask[], 'userId'>,
  addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[],
  ): Promise<{ message: string }>,
  getUserTaskById(
    { userId }: IUserData,
    taskIds: number[],
    mysqlInjection: string[],): Promise<ITask[]>,
  getUserById(userId: number): Promise<Omit<IUserData[], 'password'>>,
  deleteTasks(userData: IUserData, body: number[], queryInjection: string[]): Promise<number[]>,
}

export default ITaskModel;
