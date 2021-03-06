import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import connection from './connection';

class UserModel implements IUserModel {
  constructor(
    private connectionDb: Pool = connection,
    private dbName: string = process.env.MYSQL_DB_NAME || 'default_db',
  ) {}

  async addNewUser({
    admin,
    firstName,
    lastName,
    email,
    password,
  }: IUser): Promise<IUserData> {
    try {
      const [rows] = await this.connectionDb.execute(
        `INSERT INTO ${this.dbName}.user
          (admin, first_name, last_name, email, password)
        VALUES (?,?,?,?,?)`,
        [admin, firstName, lastName, email, password],
      );
      const { insertId } = rows as ResultSetHeader;
      return { userId: insertId, admin, firstName, lastName, email };
    } catch (error) {
      throw new Error('');
    }
  }

  async getUserByEmailAndPassword({
    email,
    password,
  }: IUserLogin): Promise<IUserData[]> {
    try {
      const [rows] = await this.connectionDb.execute(
        `SELECT
          user_id AS userId, admin, first_name AS firstName, last_name AS lastName, email
        FROM
          ${this.dbName}.user
        WHERE email = ? AND password = ?`,
        [email, password],
      );
      const userData = rows as IUserData[];
      return userData;
    } catch (error) {
      throw new Error('');
    }
  }

  async getUserByEmail({
    email,
  }: IUserLogin): Promise<IUserData[]> {
    try {
      const [rows] = await this.connectionDb.execute(
        `SELECT
          user_id AS userId, admin, first_name AS firstName, last_name AS lastName, email
        FROM
          ${this.dbName}.user
        WHERE email = ?`,
        [email],
      );
      const userData = rows as IUserData[];
      return userData;
    } catch (error) {
      throw new Error('');
    }
  }
}

export default UserModel;
