import { UpdateClientService } from '../../../../../src/application/services/client';
import { UpdateClientInput } from '../../../../../src/domain/usecases/client';

describe('Create Client Service', () => {
  let makeClientRepository = {} as any;
  let clientRepositoryFindSpy: {};
  let clientRepositoryUpdateSpy: {};
  let logger: { error: () => void };
  let loggerErrorSpy: {};

  let sut = {} as UpdateClientService;
  let clientParams: UpdateClientInput;

  beforeEach(() => {
    makeClientRepository = {
      delete: jest.fn(),
      find: () => new Promise((resolve, reject) => resolve(jest.fn)),
      update: () => new Promise((resolve, reject) => resolve(jest.fn)),
    };

    clientRepositoryUpdateSpy = jest.spyOn(makeClientRepository, 'update');
    clientRepositoryFindSpy = jest.spyOn(makeClientRepository, 'update');

    logger = { error: jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    sut = new UpdateClientService(makeClientRepository as any, logger as any);

    clientParams = {
      id_user: 'any_id',
      name: 'any_name',
      email: 'any@main.com',
      phone: '(35) 9 9999 - 9999',
      segment: 'any_segment',
    };
  });

  it('should update client with correct params', async () => {
    const result = await sut.execute(clientParams);

    expect(result).toBeUndefined();
    expect(clientRepositoryUpdateSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should return error with client not exist', async () => {
    jest.spyOn(makeClientRepository, 'find').mockImplementationOnce(() => {
      new Promise((resolve, reject) => resolve(null));
    });
    try {
      await sut.execute(clientParams);
    } catch (error) {
      expect(error).toBeDefined();
    }

    expect(clientRepositoryUpdateSpy).toHaveBeenCalledTimes(0);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });
});
