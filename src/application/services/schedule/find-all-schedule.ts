import { LoadAllSchedules } from '../../../domain/usecases/schedule/load-all-schedules';
import { ScheduleRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleOutput } from '../../models/schedule';

export class LoadAllScheduleService implements LoadAllSchedules {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id_user: string): Promise<ScheduleOutput[]> {
    try {
      const findAll = await this.scheduleRepository.findAll(id_user);
      return findAll;
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function findAllSchedules: ${error.message}`,
      );
    }
  }
}
