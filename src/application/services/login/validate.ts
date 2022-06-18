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

    if (!result) throw new Error('Client Not Exist');

    loginEntity.insertId(result.id);

    return loginEntity.validateLogin(result);
  }
}
