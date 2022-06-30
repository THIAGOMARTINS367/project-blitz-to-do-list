import { Pool } from 'mysql2/promise';
import ITask from '../interfaces/ITask';
import ITaskDb from '../interfaces/ITaskDb';
import ITaskModel from '../interfaces/ITaskModel';
import IUserData from '../interfaces/IUserData';
import IUserDb from '../interfaces/IUserDb';
import connection from './connection';

class TaskModel implements ITaskModel {
  protected connectionDb: Pool = connection;

  constructor(
    connectionDb?: Pool,
    private taskList: ITaskDb[] | [] = [],
    private userData: Omit<IUserDb[], 'password'> = []
  ) {
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
      })
    );
    return taskListFormatted as Omit<ITask[], 'userId'>;
  }

  serializeUser() {
    const userDataFormatted = this.userData.map(
      ({ user_id, admin, first_name, last_name, email }) => ({
        userId: user_id,
        admin,
        firstName: first_name,
        lastName: last_name,
        email,
      })
    );
    return userDataFormatted;
  }

  async getUserTaskList({
    userId,
  }: IUserData): Promise<Omit<ITask[], 'userId'>> {
    const [rows] = await this.connectionDb.execute(
      'SELECT * FROM blitz_toDoList.task WHERE user_id = ?',
      [userId]
    );
    this.taskList = rows as ITaskDb[];
    const taskListFormatted = this.serialize();
    return taskListFormatted as Omit<ITask[], 'userId'>;
  }

  async addNewTask(
    tasksData: (string | number)[],
    queryInjection: string[]
  ): Promise<{ message: string }> {
    const [rows] = await this.connectionDb.execute(
      `INSERT INTO
        blitz_toDoList.task (task_content, status, user_id)
      VALUES
        ${queryInjection.join(',')}`,
      [...tasksData]
    );
    this.taskList = rows as ITaskDb[];
    return { message: 'Tasks saved successfully!' };
  }

  async updateTask(
    { userId }: IUserData,
    taskId: number,
    { taskContent, status, createdAt }: ITask
  ): Promise<ITask> {
    const updatedAt = new Date();
    await this.connectionDb.execute(
      `UPDATE
        blitz_toDoList.task
      SET task_content = ?, status = ?, updated_at = ?
      WHERE task_id = ? AND user_id = ?`,
      [taskContent, status, updatedAt, taskId, userId]
    );
    return { taskId, taskContent, status, createdAt, updatedAt } as ITask;
  }

  async getUserTaskById(
    { userId }: IUserData,
    taskIds: number[],
    mysqlInjection: string[],
  ): Promise<ITask[]> {
    const [rows] = await this.connectionDb.execute(
      `SELECT * FROM blitz_toDoList.task WHERE user_id = ? AND task_id IN(${mysqlInjection.join(',')})`,
      [userId, ...taskIds]
    );
    this.taskList = rows as ITaskDb[];
    const taskFormatted = this.serialize();
    return taskFormatted as ITask[];
  }

  async getUserById(userId: number): Promise<Omit<IUserData[], 'password'>> {
    const [rows] = await this.connectionDb.execute(
      `SELECT
        user_id, admin, first_name, last_name, email
      FROM blitz_toDoList.user WHERE user_id = ?`,
      [userId]
    );
    this.userData = rows as Omit<IUserDb[], 'password'>;
    const userDataFormatted = this.serializeUser();
    return userDataFormatted as Omit<IUserData[], 'password'>;
  }

  async deleteTasks(
    { userId }: IUserData,
    body: number[],
    queryInjection: string[],
  ): Promise<number[]> {
    await this.connectionDb.execute(
      `DELETE FROM
        blitz_toDoList.task
      WHERE user_id = ? AND task_id IN(${queryInjection.join(',')})`,
      [userId, ...body],
    );
    return body;
  }
}

export default TaskModel;
