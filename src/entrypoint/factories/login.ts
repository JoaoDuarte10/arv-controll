import { Controller } from '../contracts/controller';
import { ValidateLoginService } from '../../application/services/login/validate';
import { LoginRepositoryMongo } from '../../infrastructure/repository';
import { ValidateLoginController } from '../http/controllers/login/validate';

const loginRepository = new LoginRepositoryMongo();

export const makeValidateLoginController = (): Controller => {
  const service = new ValidateLoginService(loginRepository);
  return new ValidateLoginController(service);
};
