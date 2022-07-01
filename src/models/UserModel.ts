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
    private userData: IUserDb[] = [],
  ) {
    if (connectionDb) {
      this.connectionDb = connectionDb;
    }
  }

  serialize(): IUserData[] {
    const userDataFormatted: IUserData[] = this.userData.map(({
      user_id,
      admin,
      first_name,
      last_name,
      email,
    }) => ({
      userId: user_id,
      admin,
      firstName: first_name,
      lastName: last_name,
      email,
    }));
    return userDataFormatted;
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
        user_id, admin, first_name, last_name, email
      FROM
        blitz_toDoList.user
      WHERE email = ? AND password = ?`,
      [email, password],
    );
    this.userData = rows as IUserDb[];
    const userDataFormatted = this.serialize();
    return userDataFormatted as IUserData[];
  }

  async getUserByEmail({
    email,
  }: IUserLogin): Promise<IUserData[]> {
    const [rows] = await this.connectionDb.execute(
      `SELECT
        user_id, admin, first_name, last_name, email
      FROM
        blitz_toDoList.user
      WHERE email = ?`,
      [email],
    );
    this.userData = rows as IUserDb[];
    const userDataFormatted = this.serialize();
    return userDataFormatted as IUserData[];
  }
}

export default UserModel;
