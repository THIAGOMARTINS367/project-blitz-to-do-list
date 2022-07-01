import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserDb from '../interfaces/IUserDb';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import connection from './connection';

class UserModel implements IUserModel {
  protected connectionDb: Pool = connection;

  constructor(
    connectionDb?: Pool,
  ) {
    if (connectionDb) {
      this.connectionDb = connectionDb;
    }
  }

  async addNewUser({
    admin,
    firstName,
    lastName,
    email,
    password,
  }: IUser): Promise<IUserData> {
    const [rows] = await this.connectionDb.execute(
      `INSERT INTO blitz_toDoList.user
        (admin, first_name, last_name, email, password)
      VALUES
        (?,?,?,?,?)`,
      [admin, firstName, lastName, email, password],
    );
    const { insertId } = rows as ResultSetHeader;
    return { userId: insertId, admin, firstName, lastName, email };
  }

  async getUserByEmailAndPassword({
    email,
    password,
  }: IUserLogin): Promise<IUserData[]> {
    const [rows] = await this.connectionDb.execute(
      `SELECT
        user_id AS userId, admin, first_name AS firstName, last_name AS lastName, email
      FROM
        blitz_toDoList.user
      WHERE email = ? AND password = ?`,
      [email, password],
    );
    const userData = rows as IUserData[];
    return userData as IUserData[];
  }

  async getUserByEmail({
    email,
  }: IUserLogin): Promise<IUserData[]> {
    const [rows] = await this.connectionDb.execute(
      `SELECT
        user_id AS userId, admin, first_name AS firstName, last_name AS lastName, email
      FROM
        blitz_toDoList.user
      WHERE email = ?`,
      [email],
    );
    const userData = rows as IUserData[];
    return userData as IUserData[];
  }
}

export default UserModel;
