import { Controller } from '../contracts/controller';
import { ValidateLoginService } from '../../application/services/login/validate';
import { LoginRepositoryMongo } from '../../infrastructure/repository';
import { ValidateLoginController } from '../http/controllers/login/validate';
import { Jwt } from '../../infrastructure/implementations/Jwt';

const loginRepository = new LoginRepositoryMongo();

export const makeValidateLoginController = (): Controller => {
  const jwtAdapter = new Jwt();
  const service = new ValidateLoginService(loginRepository, jwtAdapter);
  return new ValidateLoginController(service);
};
