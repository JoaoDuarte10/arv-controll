import { CreateClientService } from '../../../../../src/application/services/client/create-client';
import { CreateClientInput } from '../../../../../src/domain/usecases/client/create-client';

describe('Create Client Service', () => {
  let makeClientRepository = {} as any;
  let logger: { error: () => void };
  let loggerErrorSpy: {};

  let sut = {} as CreateClientService;

  let clientParams: CreateClientInput;

  beforeEach(() => {
    makeClientRepository = {
      create: jest.fn(),
      findByName: () => new Promise((resolve, reject) => resolve(jest.fn)),
      findByEmail: () => new Promise((resolve, reject) => resolve(jest.fn)),
    };

    logger = { error: jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    sut = new CreateClientService(makeClientRepository as any, logger as any);

    clientParams = {
      id_user: '123',
      name: 'Joao',
      email: 'joao@main.com',
      phone: '(35) 9 9999 - 9999',
      segment: 'frequente',
    };
  });

  it('should create a new client', async () => {
    jest
      .spyOn(makeClientRepository, 'findByName')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => resolve(null)),
      );
    jest
      .spyOn(makeClientRepository, 'findByEmail')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => resolve(null)),
      );

    const result = await sut.execute(clientParams);

    expect(result).toBeUndefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should new error with invalid phone', async () => {
    clientParams.phone = '999';

    try {
      await sut.execute(clientParams);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should return error with client already exist', async () => {
    try {
      await sut.execute(clientParams);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should logger with error in create a new client', async () => {
    jest
      .spyOn(makeClientRepository, 'findByName')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => resolve(null)),
      );
    jest
      .spyOn(makeClientRepository, 'findByEmail')
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => resolve(null)),
      );

    jest.spyOn(makeClientRepository, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const result = await sut.execute(clientParams);

    expect(result).toBeUndefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });
});
