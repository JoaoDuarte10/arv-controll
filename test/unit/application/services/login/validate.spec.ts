import { ValidateLoginService } from '../../../../../src/application/services/login/validate';
import { LoginModel } from '../../../../../src/application/models/login';
import { Jwt } from '../../../../../src/infrastructure/implementations/Jwt';

describe('Validate Login Service', () => {
  let loginRepository = {} as any;
  let jwtAdapter = new Jwt();
  let sut: ValidateLoginService;

  let params: LoginModel;

  beforeEach(() => {
    loginRepository = {
      find: () => {
        return new Promise((resolve, reject) =>
          resolve({ id: 'any_id', user: 'any_name', password: 'any_password' }),
        );
      },
    };

    sut = new ValidateLoginService(loginRepository, jwtAdapter);
    params = {
      user: 'any_name',
      password: 'any_password',
    };
  });

  it('should return error a invalid login', async () => {
    try {
      params.user = 'any';
      await sut.execute(params);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('shoul return token jwt', async () => {
    const result = await sut.execute(params);

    expect(typeof result.token).toBe('string');
  });

  it('should return refreshToken jwt', async () => {
    const result = await sut.execute(params);

    expect(typeof result.refreshToken).toBe('string');
  });
});
