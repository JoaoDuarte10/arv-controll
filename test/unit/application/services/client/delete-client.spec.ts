import { DeleteClientService } from '../../../../../src/application/services/client/delete-client';
describe('Create Client Service', () => {
  let makeClientRepository = {} as any;
  let clientRepositorySpy: {};
  let logger: { error: () => void };
  let loggerErrorSpy: {};

  let clientService = {} as DeleteClientService;

  beforeEach(() => {
    makeClientRepository = {
      delete: jest.fn(),
      find: () => new Promise((resolve, reject) => resolve(jest.fn)),
    };

    clientRepositorySpy = jest.spyOn(makeClientRepository, 'delete');

    logger = { error: jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    clientService = new DeleteClientService(
      makeClientRepository as any,
      logger as any,
    );
  });

  it('should delete client', async () => {
    const result = await clientService.execute('123', '123');

    expect(result).toBeUndefined();
    expect(clientRepositorySpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });
});
