import ITask from './ITask';
import ITaskService from './ITaskService';

interface ITaskModel extends ITaskService {
  serialize(): Omit<ITask[], 'userId'>,
}

export default ITaskModel;
