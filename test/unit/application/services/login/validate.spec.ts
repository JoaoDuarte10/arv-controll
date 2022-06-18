import { ValidateLoginService } from '../../../../../src/application/services/login/validate';

describe('Validate Login Service', () => {
  let loginRepository = {} as any;

  beforeEach(() => {
    loginRepository = {
      find: () => {
        return new Promise((resolve, reject) =>
          resolve({ id: 'any_id', name: 'any_name', password: 'any_password' }),
        );
      },
    };
  });

  it('should return name a valid login with exist', async () => {
    const sut = new ValidateLoginService(loginRepository);

    const result = await sut.execute({
      name: 'any_name',
      password: 'any_password',
    });

    expect(result.name).toBe('any_name');
  });

  it('should return error a invalid login', async () => {
    const sut = new ValidateLoginService(loginRepository);

    try {
      await sut.execute({ name: 'any_nam', password: 'any_password' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
