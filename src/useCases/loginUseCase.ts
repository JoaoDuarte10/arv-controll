import { ILogin, LoginRepository } from '../repository/loginRepository';
import { ILogger } from '../utils/logger';

class LoginUseCase {
  constructor(
    private loginRepository: LoginRepository,
    private readonly logger: ILogger,
  ) {}
  async findLogin({ user, password }: ILogin): Promise<ILogin> {
    try {
      const login = await this.loginRepository.findLogin({ user, password });
      return login;
    } catch (error) {
      this.logger.error(`Error LoginUseCase: ${error.message}`);
    }
  }
}

export { LoginUseCase };
