import { ClientHistoryRepository } from '../../../domain/repository/client-history';
import { ILogger } from '../../../infrastructure/utils/logger';
import { LoadHistoryByPeriod } from '../../../domain/usecases/clients-history/load-history-by-period';
import { ClientHistoryModel } from '../../models/client-history';

export class LoadHistoryByPeriodService implements LoadHistoryByPeriod {
  constructor(
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    date1: string;
    date2: string;
  }): Promise<ClientHistoryModel[]> {
    try {
      return await this.clientHistoryRepository.findByPeriod(
        params.id_user,
        params.date1,
        params.date2,
      );
    } catch (error) {
      this.logger.error(
        `Error Load History By Period Service function findByPeriod: ${error.message}`,
      );
    }
  }
}
