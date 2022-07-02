import { ScheduleRepository } from 'src/domain/repository';
import { CreateSchedule } from '../../../domain/usecases/schedule/create-schedule';
import { CreateScheduleModel } from '../../models/schedule';
import { ScheduleEntity } from '../../../domain/entities/schedule';
import { ILogger } from '../../../infrastructure/utils/logger';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../utils/type-errors';

export class CreateScheduleService implements CreateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: CreateScheduleModel): Promise<void> {
    const schedule = new ScheduleEntity(params);

    const scheduleAlreadyExists = await this.scheduleRepository.findByDate(
      params.id_user,
      params.date,
    );

    if (scheduleAlreadyExists) {
      scheduleAlreadyExists.forEach((item) => {
        if (item.time === params.time) {
          throw {
            type: TYPE_ALREADY_EXISTS,
            message: 'This time already exists',
          };
        }
      });
    }

    if (params.phone && !schedule.isValidPhone()) {
      throw {
        type: TYPE_INPUT_INVALIDS,
        message: 'Invalid phone',
      };
    }

    try {
      await this.scheduleRepository.save(schedule.returnProps());
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function saveSchedule: ${error.message}`,
      );
    }
  }
}
