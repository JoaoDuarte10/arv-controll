import { FinishSchedule } from '../../../domain/usecases/schedule/finish-schedule';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleRepository } from 'src/domain/repository';
import { ScheduleEntity } from '../../../domain/entities/schedule';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';
import { ClientHistoryRepository } from '../../../domain/repository/client-history';

export class FinishScheduleService implements FinishSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: { id_user: string; id: string }): Promise<void> {
    const scheduleAlreadyExists = await this.scheduleRepository.findById(
      params.id_user,
      params.id,
    );
    if (!scheduleAlreadyExists) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'Schedule already not exists',
      };
    }

    const schedule = new ScheduleEntity(scheduleAlreadyExists);
    schedule.registerIdSchedule(scheduleAlreadyExists.id);
    schedule.addAttendace();

    try {
      await this.clientHistoryRepository.save({
        id_user: params.id_user,
        client: scheduleAlreadyExists.client,
        description: scheduleAlreadyExists.procedure,
        date: scheduleAlreadyExists.date,
      });

      if (schedule.isValidForFinish()) {
        await this.scheduleRepository.delete(params.id_user, params.id);
      }

      await this.scheduleRepository.update(schedule.returnProps());
    } catch (error) {
      this.logger.error(
        `Failed in finish schedule service with schedule: ${params.id}. Error: ${error.message}`,
      );
    }
  }
}
