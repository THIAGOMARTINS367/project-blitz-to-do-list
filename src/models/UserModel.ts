import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUSer from '../interfaces/IUser';
import IUserData from '../interfaces/IUserData';
import IUserModel from '../interfaces/IUserModel';
import connection from './connection';

class UserModel implements IUserModel {
  protected connectionDb: Pool = connection;

  constructor(connectionDb?: Pool) {
    if (connectionDb) {
      this.connectionDb = connectionDb;
    }
  }

  async addNewUser({ admin, firstName, lastName, email, password }: IUSer): Promise<IUserData> {
    const [rows] = await this.connectionDb.execute(`
    INSERT INTO blitz_toDoList.user
      (admin, first_name, last_name, email, password)
    VALUES
      (?,?,?,?,?)`,[admin, firstName, lastName, email, password],
    );
    const { insertId } = rows as ResultSetHeader;
    return {
      userId: insertId,
      admin,
      firstName,
      lastName,
      email,
      password
    }
  }
}

export default UserModel;
