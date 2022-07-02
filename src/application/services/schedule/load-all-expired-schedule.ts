import { LoadAllExpiredSchedules } from '../../../domain/usecases/schedule/load-all-expired-schedules';
import { ScheduleRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleOutput } from '../../models/schedule';

export class LoadAllExpiredScheduleService implements LoadAllExpiredSchedules {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id_user: string): Promise<ScheduleOutput[]> {
    try {
      const findAll = await this.scheduleRepository.findAllExpireds(id_user);
      return findAll;
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function findAllSchedules: ${error.message}`,
      );
    }
  }
}
