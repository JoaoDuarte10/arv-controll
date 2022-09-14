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
      phone: '(35) 9 9999-9999',
      isDefeated: false,
      pacote: false,
      qtdAtendimento: 0,
      qtdTotalAtendimento: 0,
    };
    sut = new ScheduleEntity(paramsSchedule);
  });

  it('should return true when schedule valid for finish', () => {
    expect(sut.isValidForFinish()).toBeTruthy();
  });
});
