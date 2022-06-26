import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUSer from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserLogin from '../interfaces/IUserLogin';
import IUserModel from '../interfaces/IUserModel';
import connection from './connection';

class UserModel implements IUserModel {
  protected connectionDb: Pool = connection;

  constructor(connectionDb?: Pool) {
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
  }: IUSer): Promise<Omit<IUserData, 'password'>> {
    const [rows] = await this.connectionDb.execute(
      `
    INSERT INTO blitz_toDoList.user
      (admin, first_name, last_name, email, password)
    VALUES
      (?,?,?,?,?)`,
      [admin, firstName, lastName, email, password]
    );
    const { insertId } = rows as ResultSetHeader;
    if (admin === 1) {
      admin = true;
    } else {
      admin = false;
    }
    return {
      userId: insertId,
      admin,
      firstName,
      lastName,
      email,
    };
  }

  async getUserByEmailAndPassword({
    email,
    password,
  }: IUserLogin): Promise<Omit<IUserData[], 'password'>> {
    const [rows] = await this.connectionDb.execute(`
    SELECT
      user_id, admin, first_name, last_name, email
    FROM
      blitz_toDoList.user
    WHERE email = ? AND password = ?`,
      [email, password]
    );
    const userData = rows as Omit<IUserData[], 'password'>
    if (userData[0].admin === 1) {
      userData[0].admin = true;
    } else {
      userData[0].admin = false;
    }
    return userData;
  }
}

export default UserModel;
