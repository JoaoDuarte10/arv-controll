import { ILogin, LoginRepository } from '../../domain/repository';
import { Login } from '../models';

class LoginRepositoryMongo implements LoginRepository {
  async findLogin({ user, password }: ILogin): Promise<ILogin> {
    const login = await Login.findOne({ user: user, password: password });
    return login;
  }
}

export { LoginRepositoryMongo };
