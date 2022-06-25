import { ScheduleRepository } from 'src/domain/repository';
import { CreateSchedule } from '../../../domain/usecases/schedule/create-schedule';
import { CreateScheduleModel } from '../../models/schedule';
import { ScheduleEntity } from '../../../domain/entities/schedule';
import { ILogger } from '../../../infrastructure/utils/logger';

export class CreateScheduleService implements CreateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: CreateScheduleModel): Promise<void> {
    const schedule = new ScheduleEntity(params);

    const scheduleAlreadyExists = await this.scheduleRepository.findByTime(
      params.id_user,
      params.time,
    );
    if (scheduleAlreadyExists.time) {
      throw {
        type: 'Time already exists',
        message: 'This time already exists',
      };
    }

    try {
      await this.scheduleRepository.save(schedule);
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function saveSchedule: ${error.message}`,
      );
    }
  }
}
