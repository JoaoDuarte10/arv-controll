import { ClientHistoryRepository } from '../../../domain/repository/client-history';
import { ILogger } from '../../../infrastructure/utils/logger';
import { LoadHistoryByDate } from '../../../domain/usecases/clients-history/load-history-by-date';
import { ClientHistoryModel } from '../../models/client-history';

export class LoadHistoryByDateService implements LoadHistoryByDate {
  constructor(
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    date: string;
  }): Promise<ClientHistoryModel[]> {
    try {
      return await this.clientHistoryRepository.findByDate(
        params.id_user,
        params.date,
      );
    } catch (error) {
      this.logger.error(
        `Error Load History By Date Service function findByDate: ${error.message}`,
      );
    }
  }
}
