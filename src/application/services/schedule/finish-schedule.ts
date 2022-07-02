import { FinishSchedule } from '../../../domain/usecases/schedule/finish-schedule';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SalesRepository, ScheduleRepository } from 'src/domain/repository';
import { ScheduleEntity } from '../../../domain/entities/schedule';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';

export class FinishScheduleService implements FinishSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly salesRepository: SalesRepository,
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
      if (schedule.isFirstAttendaceForPacote()) {
        await this.salesRepository.create({
          id_user: params.id_user,
          description: scheduleAlreadyExists.procedure,
          client: scheduleAlreadyExists.client,
          date: scheduleAlreadyExists.date,
          price: scheduleAlreadyExists.price,
        });
      }

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
