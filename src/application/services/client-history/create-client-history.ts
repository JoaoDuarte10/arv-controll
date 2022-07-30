import { CreateClientHistory } from '../../../domain/usecases/clients-history/create-client-history';
import { ClientHistoryRepository } from '../../../domain/repository/client-history';
import { ClientsHistory } from '../../../domain/entities/clients-history';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientHistoryModel } from '../../models/client-history';

export class CreateClientHistoryService implements CreateClientHistory {
  constructor(
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: ClientHistoryModel): Promise<void> {
    const clientHistory = new ClientsHistory(params);

    try {
      await this.clientHistoryRepository.save(clientHistory.returnProps());
    } catch (error) {
      this.logger.error(
        `Error CreateClientHistoryService function saveClientHistory: ${error.message}`,
      );
    }
  }
}
