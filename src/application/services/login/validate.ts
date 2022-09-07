// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ValidateLoginUseCase } from '../../../domain/usecases/login/validate';
import { LoginRepository } from '../../../domain/repository';
import { LoginEntity } from '../../../domain/entities/login';
import { LoginModel } from '../../models';
import { JwtAdapter } from '../../../domain/usecases/adapter/JwtAdapter';

export class ValidateLoginService implements ValidateLoginUseCase {
  private TWO_HOURS = 2;

  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  async execute(login: LoginModel): Promise<string> {
    const loginEntity = new LoginEntity(login);

    const result = await this.loginRepository.find(login);

    if (!result) loginEntity.invalidLogin();

    loginEntity.insertId(result.id);

    const loginUser = loginEntity.validateLogin(result);

    return this.jwtAdapter.createToken(
      loginUser,
      process.env.TOKEN_LOGIN,
      this.TWO_HOURS,
    );
  }
}
