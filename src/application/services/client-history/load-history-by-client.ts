import { LoadHistoryByClient } from '../../../domain/usecases/clients-history/load-history-by-client';
import { ClientHistoryRepository } from '../../../domain/repository/client-history';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientHistoryModel } from '../../models/client-history';

export class LoadHistoryByClientService implements LoadHistoryByClient {
  constructor(
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    client: string;
  }): Promise<ClientHistoryModel[]> {
    try {
      return await this.clientHistoryRepository.findByClient(
        params.id_user,
        params.client,
      );
    } catch (error) {
      this.logger.error(
        `Error Load History By Client Service function findByClient: ${error.message}`,
      );
    }
  }
}
