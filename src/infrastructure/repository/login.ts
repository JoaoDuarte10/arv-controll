import { ILogin, LoginRepository } from '../../domain/repository';
import { database } from '../database/index';
import { LoginDb } from '../../domain/repository/login';

class LoginRepositoryMongo implements LoginRepository {
  async find(name: string, password: string): Promise<LoginDb> {
    const sql = {
      text: 'SELECT * FROM users WHERE name = $1 AND password = $2',
      values: [name, password],
    };

    const { rows } = await database.query(sql.text, sql.values);
    return rows[0];
  }
}

export { LoginRepositoryMongo };
