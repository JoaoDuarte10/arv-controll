import { ILogin, LoginRepository } from '../../src/repository/loginRepository';
import { LoginUseCase } from '../../src/useCases/loginUseCase';

describe('LoginUseCase', () => {
  const makeLoginRepository = () => {
    class MakeLoginRepository implements LoginRepository {
      findLogin({ user, password }: ILogin): Promise<ILogin> {
        return jest.fn() as any;
      }
    }
    return new MakeLoginRepository();
  };
  let logger: { error: () => void };
  let loggerErrorSpy = {};

  let loginRepositorySut = {} as any;
  let loginRepositorySpy = {} as any;
  let loginUseCase = {} as any;

  const login = { user: 'user', password: 'password' };

  beforeEach(() => {
    loginRepositorySut = makeLoginRepository();
    loginRepositorySpy = jest.spyOn(loginRepositorySut, 'findLogin');

    logger = {
      error: jest.fn(),
    };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    loginUseCase = new LoginUseCase(loginRepositorySut, logger as any);
  });

  it('should return login with sucess find login', async () => {
    try {
      await loginUseCase.findLogin(login);

      expect(loginRepositorySpy).toHaveBeenCalledTimes(1);
    } catch (error) {
      expect(error).toBeUndefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
    }
  });

  it('should logger with error', async () => {
    try {
      jest.spyOn(loginRepositorySut, 'findLogin').mockImplementationOnce(() => {
        throw new Error();
      });
      await loginUseCase.findLogin(login);

      expect(loginRepositorySpy).toHaveBeenCalledTimes(1);
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
    }
  });
});
