import ITask from './ITask';
import ITaskService from './ITaskService';

interface ITaskModel extends Omit<ITaskService, 'addNewTask'> {
  serialize(): Omit<ITask[], 'userId'>;
  addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[]
  ): Promise<{ message: string }>;
}

export default ITaskModel;
