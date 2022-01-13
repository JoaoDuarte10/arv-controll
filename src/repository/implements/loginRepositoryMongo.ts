import { LoginRepository, ILogin } from '../loginRepository';
import { Login } from '../../models/loginModel';

class LoginRepositoryMongo implements LoginRepository {
    async findLogin({ user, password }: ILogin): Promise<ILogin> {
        const login = await Login.findOne({ user: user, password: password })
        return login;
    }
}

export { LoginRepositoryMongo }