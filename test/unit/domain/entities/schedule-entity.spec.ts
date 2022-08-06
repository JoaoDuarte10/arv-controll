import {
  Schedule,
  ScheduleEntity,
} from '../../../../src/domain/entities/schedule';

describe('Schedule Entity', () => {
  let sut = {} as ScheduleEntity;
  let paramsSchedule: Schedule;

  beforeEach(() => {
    paramsSchedule = {
      id_user: '123',
      idSchedule: '123',
      client: 'Client',
      procedure: 'Procedure',
      date: '2022-08-06',
      time: '13:00',
      price: 'R$15,15',
      phone: '(35) 9 9999-9999',
      isDefeated: false,
      pacote: false,
      qtdAtendimento: 0,
      qtdTotalAtendimento: 0,
    };
    sut = new ScheduleEntity(paramsSchedule);
  });

  it('should return true when valid sales', () => {
    expect(sut.isValidSales()).toBeTruthy();
  });

  it('should return false when invalid sales', () => {
    const { price, ...params } = paramsSchedule;
    sut = new ScheduleEntity({ price: 'R$0,00', ...params });
    expect(sut.isValidSales()).toBeFalsy();
  });

  it('should return true when schedule valid for finish', () => {
    expect(sut.isValidForFinish()).toBeTruthy();
  });

  it('should return true when attendence for first in pacote', () => {
    expect(sut.isFirstAttendaceForPacote() && sut.isValidSales()).toBeTruthy();
  });
});
