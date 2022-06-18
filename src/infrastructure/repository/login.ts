import { ILogin, LoginRepository } from '../../domain/repository';
import { Login } from '../models';

class LoginRepositoryMongo implements LoginRepository {
  async find({ user, password }: ILogin): Promise<ILogin> {
    const result = await Login.findOne({ user, password });
    if (result) {
      const login = result._doc;
      const { _id, ...loginWithoutId } = login;
      return Object.assign({}, loginWithoutId, { id: _id });
    }
  }
}

export { LoginRepositoryMongo };
