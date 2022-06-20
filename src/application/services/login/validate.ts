import { ValidateLoginUseCase } from '../../../domain/usecases/login/validate';
import { LoginRepository } from '../../../domain/repository';
import { LoginEntity } from '../../../domain/entities/login';
import { LoginModel, LoginOutputModel } from '../../models';

export class ValidateLoginService implements ValidateLoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(login: LoginModel): Promise<LoginOutputModel> {
    const loginEntity = new LoginEntity(login);

    const result = await this.loginRepository.find(login);

    if (!result) throw new Error('Client Not Exist');

    loginEntity.insertId(result.id);

    return loginEntity.validateLogin(result);
  }
}
