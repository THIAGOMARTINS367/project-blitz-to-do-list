import IResponseError from './IResponseError';
import ITask from './ITask';
import IUserData from './IUserData';

interface ITaskService {
  getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'>>,
  addNewTask(userData: IUserData, body: ITask[]): Promise<{ message: string } | IResponseError>,
  updateTask(userData: IUserData, taskId: number, body: ITask): Promise<{ message: string } | IResponseError>,
}

export default ITaskService;
