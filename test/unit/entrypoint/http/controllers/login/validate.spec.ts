import { ValidateLoginController } from '../../../../../../src/entrypoint/http/controllers/login/validate';
import { NotificationErrorException } from '../../../../../../src/domain/exceptions/notification-error-exception';

describe('Validate Login Controller', () => {
  let clientService: { execute: () => Promise<string> };
  let sut: ValidateLoginController;
  let httpRequest = {} as any;

  beforeEach(() => {
    clientService = {
      execute: () => new Promise((resolve) => resolve(jest.fn() as any)),
    };
    sut = new ValidateLoginController(clientService as any);

    httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_email',
      },
    };
  });

  it('should return id and name with correct login', async () => {
    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(200);
  });

  it('should return status code 403 with invalid credentials', async () => {
    jest.spyOn(clientService, 'execute').mockImplementationOnce(() => {
      throw new NotificationErrorException([{ type: 'any', message: 'any' }]);
    });
    const result = await sut.handle(httpRequest);
    expect(result.statusCode).toBe(403);
  });

  it('should return status code 500 with error', async () => {
    jest.spyOn(clientService, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await sut.handle(httpRequest);
    expect(result.statusCode).toBe(500);
  });
});
