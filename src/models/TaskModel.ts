import { Pool } from 'mysql2/promise';
import ITask from '../interfaces/ITask';
import ITaskModel from '../interfaces/ITaskModel';
import IUserData from '../interfaces/IUserData';
import connection from './connection';

class TaskModel implements ITaskModel {
  constructor(
    private connectionDb: Pool = connection,
  ) {}

  async getUserTaskList({
    userId,
  }: IUserData): Promise<Omit<ITask[], 'userId'>> {
    try {
      const [rows] = await this.connectionDb.execute(
        `SELECT
          task_id AS taskId,
          task_content AS taskContent,
          status,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM blitz_toDoList.task WHERE user_id = ?`,
        [userId],
      );
      const taskList = rows as Omit<ITask[], 'userId'>;
      return taskList;
    } catch (error) {
      throw new Error('');
    }
  }

  async addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[],
  ): Promise<{ message: string }> {
    try {
      await this.connectionDb.execute(
        `INSERT INTO
          blitz_toDoList.task (task_content, status, user_id)
        VALUES
          ${queryInjection.join(',')}`,
        [...tasksData],
      );
      return { message: 'Tasks saved successfully!' };
    } catch (error) {
      throw new Error('');
    }
  }

  async updateTask(
    { userId }: IUserData,
    taskId: number,
    { taskContent, status, createdAt }: ITask,
  ): Promise<ITask> {
    try {
      const updatedAt: Date = new Date();
      await this.connectionDb.execute(
        `UPDATE
          blitz_toDoList.task
        SET task_content = ?, status = ?, updated_at = ?
        WHERE task_id = ? AND user_id = ?`,
        [taskContent, status, updatedAt, taskId, userId],
      );
      return { taskId, taskContent, status, createdAt, updatedAt } as ITask;
    } catch (error) {
      throw new Error('');
    }
  }

  async getUserTaskById(
    { userId }: IUserData,
    taskIds: number[],
    mysqlInjection: string[],
  ): Promise<ITask[]> {
    try {
      const [rows] = await this.connectionDb.execute(
        `SELECT task_id AS taskId, task_content AS taskContent, status,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM blitz_toDoList.task
        WHERE user_id = ? AND task_id IN(${mysqlInjection.join(',')})`,
        [userId, ...taskIds],
      );
      const taskList = rows as Omit<ITask[], 'userId'>;
      return taskList;
    } catch (error) {
      throw new Error('');
    }
  }

  async getUserById(userId: number): Promise<IUserData[]> {
    try {
      const [rows] = await this.connectionDb.execute(
        `SELECT
          user_id AS userId,
          admin,
          first_name AS firstName,
          last_name AS lastName,
          email
        FROM blitz_toDoList.user WHERE user_id = ?`,
        [userId],
      );
      const userData = rows as IUserData[];
      return userData;
    } catch (error) {
      throw new Error('');
    }
  }

  async deleteTasks(
    { userId }: IUserData,
    body: number[],
    queryInjection: string[],
  ): Promise<number[]> {
    try {
      await this.connectionDb.execute(
        `DELETE FROM
          blitz_toDoList.task
        WHERE user_id = ? AND task_id IN(${queryInjection.join(',')})`,
        [userId, ...body],
      );
      return body;
    } catch (error) {
      throw new Error('');
    }
  }
}

export default TaskModel;
