import { Pool } from 'mysql2/promise';
import ITask from '../interfaces/ITask';
import ITaskDb from '../interfaces/ITaskDb';
import ITaskModel from '../interfaces/ITaskModel';
import IUserData from '../interfaces/IUserData';
import connection from './connection';

class TaskModel implements ITaskModel {
  protected connectionDb: Pool = connection;

  constructor(connectionDb?: Pool, private taskList: ITaskDb[] | [] = []) {
    if (connectionDb) {
      this.connectionDb = connectionDb;
    }
  }

  serialize(): Omit<ITask[], 'userId'> {
    const taskListFormatted = this.taskList.map(
      ({ task_id, task_content, status, created_at, updated_at }) => ({
        taskId: task_id,
        taskContent: task_content,
        status,
        createdAt: created_at,
        updatedAt: updated_at,
      }),
    );
    return taskListFormatted as Omit<ITask[], 'userId'>;
  }

  async getUserTaskList({
    userId,
  }: IUserData): Promise<Omit<ITask[], 'userId'>> {
    const [rows] = await this.connectionDb.execute(
      'SELECT * FROM blitz_toDoList.task WHERE user_id = ?',
      [userId],
    );
    this.taskList = rows as ITaskDb[];
    const taskListFormatted = this.serialize();
    return taskListFormatted as Omit<ITask[], 'userId'>;
  }

  async addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[],
  ): Promise<{ message: string }> {
    const [rows] = await this.connectionDb.execute(
      `INSERT INTO
        blitz_toDoList.task (task_content, status, user_id)
      VALUES
        ${queryInjection.join(',')}`,
      [...tasksData],
    );
    this.taskList = rows as ITaskDb[];
    return { message: 'Tasks saved successfully!' };
  }
}

export default TaskModel;
