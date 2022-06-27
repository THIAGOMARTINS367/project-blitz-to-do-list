import ITask from './ITask';
import IUserData from './IUserData';

interface ITaskService {
  getUserTaskList(userData: IUserData): Promise<Omit<ITask[], 'userId'>>,
}

export default ITaskService;
