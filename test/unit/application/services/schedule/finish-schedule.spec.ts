import { FinishScheduleService } from '../../../../../src/application/services/schedule/finish-schedule';
import { TYPE_NOT_EXISTS } from '../../../../../src/application/utils/type-errors';

describe('Finish Schedule Service', () => {
  let sut = {} as FinishScheduleService;
  let scheduleRepositoryMake: {
    findById: () => void;
    update: () => void;
    delete: () => void;
  };
  let scheduleRepositorySpy: {
    delete: jest.SpyInstance;
    findById: jest.SpyInstance;
    update: jest.SpyInstance;
  };
  let clientHistoryRepositoryMake: { save: () => void };
  let clientHistoryRepositorySpy: { save: jest.SpyInstance };
  let logger: { error: () => void };
  let loggerSpy: { error: jest.SpyInstance };

  let paramsMock: { id_user: string; id: string };

  beforeEach(() => {
    scheduleRepositoryMake = {
      findById: () => {
        return new Promise((resolve, reject) => {
          resolve({
            id: '123',
            id_user: '123',
            idSchedule: '123',
            client: 'Client',
            procedure: 'Procedure',
            date: '2022-08-06',
            time: '13:00',
            phone: '(35) 9 9999-9999',
            isDefeated: false,
            pacote: false,
            qtdAtendimento: 0,
            qtdTotalAtendimento: 0,
          });
        });
      },
      update: () => jest.fn(),
      delete: () => jest.fn(),
    };
    scheduleRepositorySpy = {
      delete: jest.spyOn(scheduleRepositoryMake, 'delete'),
      findById: jest.spyOn(scheduleRepositoryMake, 'findById'),
      update: jest.spyOn(scheduleRepositoryMake, 'update'),
    };
    clientHistoryRepositoryMake = {
      save: () => jest.fn(),
    };
    clientHistoryRepositorySpy = {
      save: jest.spyOn(clientHistoryRepositoryMake, 'save'),
    };
    logger = { error: () => jest.fn() };
    loggerSpy = { error: jest.spyOn(logger, 'error') };
    sut = new FinishScheduleService(
      scheduleRepositoryMake as any,
      clientHistoryRepositoryMake as any,
      logger as any,
    );
    paramsMock = {
      id_user: '123',
      id: '123',
    };
  });

  it('should create a new history', async () => {
    await sut.execute(paramsMock);

    expect(scheduleRepositorySpy.delete).toHaveBeenCalledTimes(1);
    expect(clientHistoryRepositorySpy.save).toHaveBeenCalledTimes(1);
  });

  it('should return new error when schedule not exist', async () => {
    scheduleRepositoryMake.findById = () => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    };

    try {
      await sut.execute(paramsMock);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.type).toBe(TYPE_NOT_EXISTS);
    }
  });

  it('should update schedule when is invalid for finish', async () => {
    scheduleRepositoryMake.findById = () => {
      return new Promise((resolve, reject) => {
        resolve({
          id: '123',
          id_user: '123',
          idSchedule: '123',
          client: 'Client',
          procedure: 'Procedure',
          date: '2022-08-06',
          time: '13:00',
          phone: '(35) 9 9999-9999',
          isDefeated: false,
          pacote: true,
          qtdAtendimento: 0,
          qtdTotalAtendimento: 4,
        });
      });
    };

    await sut.execute(paramsMock);

    expect(scheduleRepositorySpy.delete).toHaveBeenCalledTimes(0);
    expect(scheduleRepositorySpy.update).toHaveBeenCalledTimes(1);
  });

  it('Should logger when exception occured', async () => {
    jest.spyOn(scheduleRepositoryMake, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    try {
      await sut.execute(paramsMock);
    } catch (error) {
      expect(loggerSpy.error).toHaveBeenCalledTimes(1);
    }
  });
});
