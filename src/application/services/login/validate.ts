// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ValidateLoginUseCase } from '../../../domain/usecases/login/validate';
import { LoginRepository } from '../../../domain/repository';
import { LoginEntity } from '../../../domain/entities/login';
import { LoginModel } from '../../models';
import { JwtAdapter } from '../../../domain/usecases/adapter/JwtAdapter';
import { LoginOutputModel } from '../../models/login';

export class ValidateLoginService implements ValidateLoginUseCase {
  private TWO_HOURS = 24;

  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  async execute(login: LoginModel): Promise<LoginOutputModel> {
    const loginEntity = new LoginEntity(login);

    const result = await this.loginRepository.find(login);

    if (!result) loginEntity.invalidLogin();

    loginEntity.insertId(result.id);

    const loginUser = loginEntity.validateLogin(result);

    const token = this.jwtAdapter.createToken(
      loginUser,
      process.env.SECRECT_TOKEN,
      this.TWO_HOURS,
    );

    return {
      token,
      refreshToken: '',
    };
  }
}
