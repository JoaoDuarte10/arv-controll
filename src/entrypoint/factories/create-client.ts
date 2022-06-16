import { Controller } from '../contracts/controller';
import { ClientRepositoryMongo } from '../../infrastructure/repository';
import { CreateClientService } from '../../data/services/client/create-client';
import { CreateClientController } from '../http/controllers/client/create-client';
import { logger } from '../../infrastructure/utils/logger';

export const makeCreateClientController = (): Controller => {
  const clientRepository = new ClientRepositoryMongo();
  const clientUseCase = new CreateClientService(clientRepository, logger);
  return new CreateClientController(clientUseCase);
};
