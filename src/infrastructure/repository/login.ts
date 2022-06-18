import { ILogin, LoginRepository } from '../../domain/repository';
import { Login } from '../models';

class LoginRepositoryMongo implements LoginRepository {
  async find({ name, password }: ILogin): Promise<ILogin> {
    const login = await Login.findOne({ user: name, password: password });
    return login;
  }
}

export { LoginRepositoryMongo };
