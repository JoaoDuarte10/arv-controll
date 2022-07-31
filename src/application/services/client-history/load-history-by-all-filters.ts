import { ClientHistory } from 'src/domain/entities/clients-history';
import { LoadHistoryByAllFilters } from '../../../domain/usecases/clients-history/load-history-by-all-filter';
import { ClientHistoryRepository } from '../../../domain/repository/client-history';
import { ILogger } from '../../../infrastructure/utils/logger';

export class LoadHistoryByAllFilterService implements LoadHistoryByAllFilters {
  constructor(
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    client: string;
    date1: string;
    date2: string;
  }): Promise<ClientHistory[]> {
    try {
      const date2 = params.date2 || params.date1;

      return await this.clientHistoryRepository.findByAllFilters(
        params.id_user,
        params.client,
        params.date1,
        date2,
      );
    } catch (error) {
      this.logger.error(
        `Error Load History By All Filters function findByAllFilters: ${error.message}`,
      );
    }
  }
}
