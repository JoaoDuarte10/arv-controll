import {
  Login,
  ValidateLoginUseCase,
} from '../../../domain/usecases/login/validate';
import { LoginRepository } from '../../../domain/repository';
import { LoginEntity, LoginOutput } from '../../../domain/entities/login';

export class ValidateLoginService implements ValidateLoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(login: Login): Promise<LoginOutput> {
    const loginEntity = new LoginEntity(login);

    const result = await this.loginRepository.find(login);

    return loginEntity.validateLogin(result);
  }
}
