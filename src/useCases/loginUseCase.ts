import { ILogin, LoginRepository } from '../repository/loginRepository'
import { logger } from '../utils/logger';

class LoginUseCase {
    constructor(private loginRepository: LoginRepository) { }
    async findLogin({ user, password }: ILogin): Promise<ILogin> {
        try {
            const login = await this.loginRepository.findLogin({ user, password });
            return login
        } catch (error) {
            logger.error(`Error LoginUseCase: ${error.message}`)
        }
    }
}

export { LoginUseCase }