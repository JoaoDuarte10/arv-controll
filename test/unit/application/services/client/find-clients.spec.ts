import { FindClientService } from '../../../../../src/application/services/client/find-clients';
describe('Create Client Service', () => {
  let makeClientRepository = {} as any;
  let clientRepositoryFindSpy: {};
  let clientRepositoryFindAllSpy: {};
  let clientRepositoryFindBySegmentSpy: {};

  let logger: { error: () => void };
  let loggerErrorSpy: {};

  let sut = {} as FindClientService;

  const params = { id_user: 'any_id_user', id: 'any_id' };

  beforeEach(() => {
    makeClientRepository = {
      delete: jest.fn(),
      find: () => new Promise((resolve, reject) => resolve(jest.fn)),
      findAll: () => new Promise((resolve, reject) => resolve(jest.fn)),
      findBySegment: () => new Promise((resolve, reject) => resolve(jest.fn)),
    };

    clientRepositoryFindSpy = jest.spyOn(makeClientRepository, 'find');
    clientRepositoryFindAllSpy = jest.spyOn(makeClientRepository, 'findAll');
    clientRepositoryFindBySegmentSpy = jest.spyOn(
      makeClientRepository,
      'findBySegment',
    );

    logger = { error: jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    sut = new FindClientService(makeClientRepository as any, logger as any);
  });

  it('should return client by id', async () => {
    const result = await sut.find(params.id_user, params.id);

    expect(result).toBeDefined();
    expect(clientRepositoryFindSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in find client in repository', async () => {
    jest.spyOn(makeClientRepository, 'find').mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await sut.find(params.id_user, params.id);

    expect(result).toBeUndefined();
    expect(clientRepositoryFindSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should return all clients', async () => {
    const result = await sut.findAll(params.id_user);

    expect(result).toBeDefined();
    expect(clientRepositoryFindAllSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in find all clients in repository', async () => {
    jest.spyOn(makeClientRepository, 'findAll').mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await sut.findAll(params.id_user);

    expect(result).toBeUndefined();
    expect(clientRepositoryFindAllSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });
});
