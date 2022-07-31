import { LoadScheduleByClient } from '../../../domain/usecases/schedule/load-by-client';
import { ScheduleRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleOutput } from '../../models/schedule';

export class LoadScheduleByClientService implements LoadScheduleByClient {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    client: string;
  }): Promise<ScheduleOutput[]> {
    try {
      return await this.scheduleRepository.findByClient(
        params.id_user,
        params.client,
      );
    } catch (error) {
      this.logger.error(
        `Error in Load Schedule By Client Service in function findByClient: ${error.message}`,
      );
    }
  }
}
