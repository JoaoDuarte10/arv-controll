import moment from 'moment';
import { SalesRepository } from '../repository/salesRepository';
import {
  ScheduleRepository,
  ISchedule,
} from '../repository/scheduleRepository';
import { logger } from '../utils/logger';

class ScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private salesRepository: SalesRepository,
  ) {}

  async findAllSchedules(id_user: string): Promise<ISchedule[]> {
    try {
      const findAll = await this.scheduleRepository.findAllSchedules(id_user);
      return findAll;
    } catch (error) {
      logger.error(
        `Error in ScheduleUseCase in function findAllSchedules: ${error.message}`,
      );
    }
  }

  async findScheduleByDate(
    id_user: string,
    date: string,
  ): Promise<ISchedule[]> {
    try {
      const dateSubtract = moment(new Date())
        .subtract('1', 'day')
        .format('YYYY-MM-DD');

      const findWhereDataLassThen =
        await this.scheduleRepository.findScheduleWhereDateLassThen(
          id_user,
          dateSubtract,
        );

      const findScheduleByDate =
        await this.scheduleRepository.findScheduleByDate(id_user, date);

      const result = [...findScheduleByDate, ...findWhereDataLassThen];

      return result
        .filter((item) => !!item._id)
        .filter((item) => (item.isDefeated ? item : item));
    } catch (error) {
      logger.error(
        `Error in ScheduleUseCase in function findScheduleByDate: ${error.message}`,
      );
    }
  }

  async saveSchedule({
    id_user,
    client,
    procedure,
    date,
    time,
    price,
    phone,
    pacote,
    qtdTotalAtendimento,
  }: ISchedule): Promise<void> {
    try {
      const scheduleAlreadyExists =
        await this.scheduleRepository.findScheduleByTime(id_user, time);
      if (scheduleAlreadyExists.time) {
        throw {
          type: 'Time already exists',
          message: 'This time already exists',
        };
      }
      await this.scheduleRepository.saveSchedule({
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdTotalAtendimento,
      });
    } catch (error) {
      logger.error(
        `Error in ScheduleUseCase in function saveSchedule: ${error.message}`,
      );
    }
  }

  async updateSchedule({
    id_user,
    id,
    client,
    procedure,
    date,
    time,
    price,
    phone,
    pacote,
    qtdTotalAtendimento,
    qtdAtendimento,
  }: ISchedule): Promise<ISchedule> {
    try {
      const scheduleAlreadyExists =
        await this.scheduleRepository.findScheduleById(id_user, id);
      if (!scheduleAlreadyExists) {
        throw {
          type: 'Schedule already not exists',
          message: 'This time already not exists',
        };
      }

      if (pacote === false) {
        qtdTotalAtendimento = 0;
        qtdAtendimento = 0;
      }

      const update = await this.scheduleRepository.updateSchedule({
        id_user,
        id,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdTotalAtendimento,
        qtdAtendimento,
      });
      return update;
    } catch (error) {
      logger.error(
        `Error in ScheduleUseCase in function updateSchedule: ${error.message}`,
      );
    }
  }

  async deleteSchedule(id_user: string, id: string): Promise<void> {
    try {
      const scheduleAlreadyExists =
        await this.scheduleRepository.findScheduleById(id_user, id);
      if (!scheduleAlreadyExists) {
        throw {
          type: 'Schedule already not exists',
          message: 'Schedule already not exists',
        };
      }
      await this.scheduleRepository.deleteSchedule(id_user, id);
    } catch (error) {
      logger.error(
        `Error in ScheduleUseCase in function deleteSchedule: ${error.message}`,
      );
    }
  }

  async finishSchedule(id_user: string, id: string): Promise<void> {
    const scheduleAlreadyExists =
      await this.scheduleRepository.findScheduleById(id_user, id);
    if (!scheduleAlreadyExists) {
      throw {
        type: 'Schedule already not exists',
        message: 'Schedule already not exists',
      };
    }

    const qtdAtendimentoAtual = scheduleAlreadyExists.qtdAtendimento + 1;

    await this.updateSchedule({
      id_user,
      id,
      client: scheduleAlreadyExists.client,
      procedure: scheduleAlreadyExists.procedure,
      date: scheduleAlreadyExists.date,
      time: scheduleAlreadyExists.time,
      price: scheduleAlreadyExists.price,
      phone: scheduleAlreadyExists.phone,
      pacote: scheduleAlreadyExists.pacote,
      qtdTotalAtendimento: scheduleAlreadyExists.qtdTotalAtendimento,
      qtdAtendimento: qtdAtendimentoAtual,
    });

    if (
      qtdAtendimentoAtual >= scheduleAlreadyExists.qtdTotalAtendimento ||
      !scheduleAlreadyExists.pacote
    ) {
      await this.scheduleRepository.deleteSchedule(id_user, id);
      await this.salesRepository.saveSales({
        id_user,
        description: scheduleAlreadyExists.procedure,
        client: scheduleAlreadyExists.client,
        date: scheduleAlreadyExists.date,
        price: scheduleAlreadyExists.price,
      });
    }
  }
}

export { ScheduleUseCase };
