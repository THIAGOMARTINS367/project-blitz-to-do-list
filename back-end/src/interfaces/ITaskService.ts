import IResponseError from './IResponseError';
import ITask from './ITask';
import IUserData from './IUserData';

interface ITaskService {
  getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'> | IResponseError>,
  addNewTask(userData: IUserData, body: ITask[]): Promise<{ message: string } | IResponseError>,
  updateTask(userData: IUserData, taskId: number, body: ITask): Promise<ITask | IResponseError>,
  deleteTasks(userData: IUserData, body: { tasks: number[] }): Promise<number[] | IResponseError>,
}

export default ITaskService;
