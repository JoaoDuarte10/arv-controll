import { ILogin, LoginRepository } from '../../domain/repository';
import { Login } from '../models';

class LoginRepositoryMongo implements LoginRepository {
  async find({ user, password }: ILogin): Promise<ILogin> {
    const result = await Login.findOne({ user, password });

    if (result) {
      const { _id, user, password } = result;
      return Object.assign({}, { id: _id, user, password }) as any;
    }
  }
}

export { LoginRepositoryMongo };
