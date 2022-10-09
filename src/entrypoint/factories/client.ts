import { Controller } from '../contracts/controller';
import { ClientRepositoryMongo } from '../../infrastructure/repository';
import { CreateClientService } from '../../application/services/client/create-client';
import { CreateClientController } from '../http/controllers/client/create-client';
import { UpdateClientService } from '../../application/services/client/update-client';
import { UpdateClientController } from '../http/controllers/client/update-client';
import { FindClientController } from '../http/controllers/client/find-client';
import { FindAllClientController } from '../http/controllers/client/find-all-clients';
import { FindClientBySegmentController } from '../http/controllers/client/find-client-by-segment';
import { DeleteClientController } from '../http/controllers/client/delete-client';
import { FindClientService } from '../../application/services/client/find-clients';
import { DeleteClientService } from '../../application/services/client/delete-client';
import { logger } from '../../infrastructure/utils/logger';

const clientRepository = new ClientRepositoryMongo();

export const makeCreateClientController = (): Controller => {
  const service = new CreateClientService(clientRepository as any, logger);
  return new CreateClientController(service);
};

export const makeUpdateClientController = (): Controller => {
  const service = new UpdateClientService(clientRepository as any, logger);
  return new UpdateClientController(service as any);
};

export const makeFindClientController = (): Controller => {
  const service = new FindClientService(clientRepository as any, logger);
  return new FindClientController(service);
};

export const makeFindAllClientController = (): Controller => {
  const service = new FindClientService(clientRepository as any, logger);
  return new FindAllClientController(service);
};

export const makeFindBySegmentClientController = (): Controller => {
  const service = new FindClientService(clientRepository as any, logger);
  return new FindClientBySegmentController(service);
};

export const makeDeleteClientController = (): Controller => {
  const service = new DeleteClientService(clientRepository as any, logger);
  return new DeleteClientController(service);
};
