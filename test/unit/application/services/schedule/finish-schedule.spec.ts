import { FinishScheduleService } from '../../../../../src/application/services/schedule/finish-schedule';

describe('Finish Schedule Service', () => {
  let sut = {} as FinishScheduleService;
  let scheduleRepositoryMake: {
    findById: () => void;
    update: () => void;
    delete: () => void;
  };
  let scheduleRepositorySpy;
  let salesRepositoryMake: { create: () => void };
  let salesRepositorySpy;
  let clientHistoryRepositoryMake: { save: () => void };
  let logger: { error: () => void };

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
            price: 'R$15,00',
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
    scheduleRepositorySpy = jest.spyOn(scheduleRepositoryMake, 'delete');
    salesRepositoryMake = {
      create: () => jest.fn(),
    };
    salesRepositorySpy = jest.spyOn(salesRepositoryMake, 'create');
    clientHistoryRepositoryMake = {
      save: () => jest.fn(),
    };
    logger = { error: () => jest.fn() };
    sut = new FinishScheduleService(
      scheduleRepositoryMake as any,
      salesRepositoryMake as any,
      clientHistoryRepositoryMake as any,
      logger as any,
    );
    paramsMock = {
      id_user: '123',
      id: '123',
    };
  });

  it('should create a new sales', async () => {
    await sut.execute(paramsMock);

    expect(salesRepositorySpy).toHaveBeenCalledTimes(1);
    expect(scheduleRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
