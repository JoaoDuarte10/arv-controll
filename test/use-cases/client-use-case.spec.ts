import {
  ClientRepository,
  IClient,
} from '../../src/repository/clientRepository';
import { ClientUseCase } from '../../src/useCases/clientUseCase';

describe('ClientUseCase', () => {
  const makeClientUseCase = () => {
    class MakeClientRepository implements ClientRepository {
      newClient({
        id_user,
        name,
        email,
        phone,
        segment,
      }: IClient): Promise<void> {
        return jest.fn() as any;
      }
      updateClient({
        id_user,
        id,
        name,
        email,
        phone,
        segment,
      }: IClient): Promise<IClient[]> {
        return jest.fn() as any;
      }
      findAllClients(id_user: string): Promise<IClient[]> {
        return jest.fn() as any;
      }
      findClient(id_user: string, id: string): Promise<IClient> {
        return jest.fn() as any;
      }
      findByEmail(id_user: string, email: string): Promise<IClient> {
        return jest.fn() as any;
      }
      findByName(id_user: string, name: string): Promise<IClient> {
        return jest.fn() as any;
      }
      findBySegment(id_user: string, segment: string): Promise<IClient[]> {
        return jest.fn() as any;
      }
      deleteClient(id_user: string, id: string): Promise<void> {
        return jest.fn() as any;
      }
    }
    return new MakeClientRepository();
  };

  let clientUseCase = {} as ClientUseCase;
  let clientUseCaseSut = {} as any;
  let logger: { error: () => void };
  let loggerErrorSpy = {};

  let params = {} as IClient;

  beforeEach(() => {
    logger = {
      error: jest.fn(),
    };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    clientUseCaseSut = makeClientUseCase();

    clientUseCase = new ClientUseCase(clientUseCaseSut, logger as any);

    params = {
      id_user: '',
      id: '',
      name: '',
      email: '',
      phone: '',
      segment: '',
    };
  });

  it('should create a new client', async () => {
    params.email = 'email@example.com';
    jest.spyOn(clientUseCaseSut, 'findByEmail').mockImplementationOnce(() => {
      return null;
    });
    jest.spyOn(clientUseCaseSut, 'findByName').mockImplementationOnce(() => {
      return null;
    });

    const result = await clientUseCase.newClient(params);
    expect(result).toBeUndefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should return error with client exist where find by email', async () => {
    params.email = 'email@example.com';

    try {
      const result = await clientUseCase.newClient(params);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
    }
  });

  it('should return error with client exist where find by name', async () => {
    params.email = 'email@example.com';
    jest.spyOn(clientUseCaseSut, 'findByEmail').mockImplementationOnce(() => {
      return null;
    });

    try {
      const result = await clientUseCase.newClient(params);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
    }
  });

  it('should logger with error in create a new client', async () => {
    params.email = 'email@example.com';
    jest.spyOn(clientUseCaseSut, 'findByEmail').mockImplementationOnce(() => {
      return null;
    });
    jest.spyOn(clientUseCaseSut, 'findByName').mockImplementationOnce(() => {
      return null;
    });
    jest.spyOn(clientUseCaseSut, 'newClient').mockImplementationOnce(() => {
      throw new Error();
    });

    try {
      const result = await clientUseCase.newClient(params);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
    }
  });

  it('should update client', async () => {
    jest.spyOn(clientUseCaseSut, 'findClient').mockImplementationOnce(() => {
      return { client: 'client value' };
    });
    const result = await clientUseCase.updateClient(params);
    expect(result).toBeDefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should return error with client not exist', async () => {
    jest.spyOn(clientUseCaseSut, 'findClient').mockImplementationOnce(() => {
      return null;
    });

    try {
      const result = await clientUseCase.updateClient(params);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
    }
  });

  it('should logger with error in update client', async () => {
    jest.spyOn(clientUseCaseSut, 'findClient').mockImplementationOnce(() => {
      return { client: 'client' };
    });
    jest.spyOn(clientUseCaseSut, 'updateClient').mockImplementationOnce(() => {
      throw new Error();
    });

    try {
      const result = await clientUseCase.updateClient(params);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
    }
  });

  it('should find all clients', async () => {
    const result = await clientUseCase.findAllClients(params.id_user);
    expect(result).toBeDefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in find all clients', async () => {
    jest
      .spyOn(clientUseCaseSut, 'findAllClients')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    await clientUseCase.findAllClients(params.id_user);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should one client', async () => {
    const result = await clientUseCase.findClient(params.id_user, params.id);
    expect(result).toBeDefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in one client', async () => {
    jest.spyOn(clientUseCaseSut, 'findClient').mockImplementationOnce(() => {
      throw new Error();
    });
    await clientUseCase.findClient(params.id_user, params.id);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should find clients by segments', async () => {
    const result = await clientUseCase.findBySegment(params.id_user, params.id);
    expect(result).toBeDefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in find clients by segments', async () => {
    jest.spyOn(clientUseCaseSut, 'findBySegment').mockImplementationOnce(() => {
      throw new Error();
    });
    await clientUseCase.findBySegment(params.id_user, params.id);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete client', async () => {
    const result = await clientUseCase.deleteClient(params.id_user, params.id);
    expect(result).toBeUndefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should logger with error in delete client', async () => {
    jest.spyOn(clientUseCaseSut, 'deleteClient').mockImplementationOnce(() => {
      throw new Error();
    });
    await clientUseCase.deleteClient(params.id_user, params.id);
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should return error with client does not exist', async () => {
    jest.spyOn(clientUseCaseSut, 'findClient').mockImplementationOnce(() => {
      return null;
    });
    try {
      await clientUseCase.deleteClient(params.id_user, params.id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
    }
  });
});
