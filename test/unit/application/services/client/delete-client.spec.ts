import { DeleteClientService } from '../../../../../src/application/services/client/delete-client';
describe('Create Client Service', () => {
  let makeClientRepository = {} as any;
  let clientRepositorySpy: {};
  let logger: { error: () => void };
  let loggerErrorSpy: {};

  let sut = {} as DeleteClientService;

  beforeEach(() => {
    makeClientRepository = {
      delete: jest.fn(),
      find: () => new Promise((resolve, reject) => resolve(jest.fn)),
    };

    clientRepositorySpy = jest.spyOn(makeClientRepository, 'delete');

    logger = { error: jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    sut = new DeleteClientService(makeClientRepository as any, logger as any);
  });

  it('should delete client', async () => {
    const result = await sut.execute('123', '123');

    expect(result).toBeUndefined();
    expect(clientRepositorySpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should return error with client not exist', async () => {
    jest.spyOn(makeClientRepository, 'find').mockImplementationOnce(() => {
      new Promise((resolve, reject) => resolve(null));
    });
    try {
      await sut.execute('123', '123');
    } catch (error) {
      expect(error).toBeDefined();
    }
    expect(clientRepositorySpy).toHaveBeenCalledTimes(0);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with eroror in delete client', async () => {
    jest.spyOn(makeClientRepository, 'delete').mockImplementationOnce(() => {
      throw new Error();
    });
    try {
      await sut.execute('123', '123');
    } catch (error) {
      expect(error).toBeDefined();
    }
    expect(clientRepositorySpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });
});
