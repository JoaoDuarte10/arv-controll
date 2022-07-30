import { logger } from '../../infrastructure/utils/logger';
import { ClientHistoryRepositoryMongo } from '../../infrastructure/repository/client-history';
import { CreateClientHistoryService } from '../../application/services/client-history/create-client-history';
import { CreateClientHistoryController } from '../http/controllers/client-history/create-client-history';
import { LoadHistoryByPeriodService } from '../../application/services/client-history/load-history-by-period';
import {
  LoadHistoryByClientController,
  LoadHistoryByDateController,
  LoadHistoryByPeriodController,
} from '../http/controllers/client-history';
import {
  LoadHistoryByClientService,
  LoadHistoryByDateService,
} from '../../application/services/client-history';

export const makeCreateClientHistoryController = () => {
  const repository = new ClientHistoryRepositoryMongo();
  const service = new CreateClientHistoryService(repository, logger);
  return new CreateClientHistoryController(service);
};

export const makeLoadHistoryByClientController = () => {
  const repository = new ClientHistoryRepositoryMongo();
  const service = new LoadHistoryByClientService(repository, logger);
  return new LoadHistoryByClientController(service);
};

export const makeLoadHistoryByDateController = () => {
  const repository = new ClientHistoryRepositoryMongo();
  const service = new LoadHistoryByDateService(repository, logger);
  return new LoadHistoryByDateController(service);
};

export const makeLoadHistoryByPeriodController = () => {
  const repository = new ClientHistoryRepositoryMongo();
  const service = new LoadHistoryByPeriodService(repository, logger);
  return new LoadHistoryByPeriodController(service);
};
