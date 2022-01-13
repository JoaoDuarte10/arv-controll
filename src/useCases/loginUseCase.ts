import { ILogin, LoginRepository } from '../repository/loginRepository'

class LoginUseCase {
    constructor(private loginRepository: LoginRepository) { }
    async findLogin({ user, password }: ILogin): Promise<ILogin> {
        const login = await this.loginRepository.findLogin({ user, password });
        return login
    }
}

export { LoginUseCase }