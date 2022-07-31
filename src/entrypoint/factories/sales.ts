import { SalesRepositoryMongoDB } from '../../infrastructure/repository';
import { CreateSalesService } from '../../application/services/sales/create-sales';
import { logger } from '../../infrastructure/utils/logger';
import { CreateSalesController } from '../http/controllers/sales/create-sales';
import { LoadSalesForClientByPeriodController } from '../http/controllers/sales/load-sales-for-client-by-period';
import { LoadSalesForPeriodService } from '../../application/services/sales/load-sales-for-period';
import { LoadSalesForClientController } from '../http/controllers/sales/load-sales-for-client';
import { LoadSalesForClientService } from '../../application/services/sales/load-sales-for-client';
import { LoadSalesForDateController } from '../http/controllers/sales/load-sales-for-date';
import { LoadSalesForDateService } from '../../application/services/sales/load-sales-for-date';
import { LoadSalesForPeriodController } from '../http/controllers/sales/load-sales-for-period';
import { ClientHistoryRepositoryMongo } from '../../infrastructure/repository/client-history';
import { LoadHistoryByAllFilterController } from '../http/controllers/client-history/load-history-by-all-filters';
import { LoadSalesByAllFiltersService } from '../../application/services/sales/load-sales-by-all-filters';

export const makeCreateSalesController = () => {
  const repository = new SalesRepositoryMongoDB();
  const clientRepository = new ClientHistoryRepositoryMongo();
  const service = new CreateSalesService(repository, clientRepository, logger);
  return new CreateSalesController(service);
};

export const makeLoadSalesForClientByPeriodController = () => {
  const repository = new SalesRepositoryMongoDB();
  const service = new LoadSalesForPeriodService(repository);
  return new LoadSalesForClientByPeriodController(service);
};

export const makeLoadSalesForClientController = () => {
  const repository = new SalesRepositoryMongoDB();
  const service = new LoadSalesForClientService(repository, logger);
  return new LoadSalesForClientController(service);
};

export const makeLoadSalesForDateController = () => {
  const repository = new SalesRepositoryMongoDB();
  const service = new LoadSalesForDateService(repository, logger);
  return new LoadSalesForDateController(service);
};

export const makeLoadSalesForPeriodController = () => {
  const repository = new SalesRepositoryMongoDB();
  const serviceForPeriod = new LoadSalesForPeriodService(repository);
  const serviceForDate = new LoadSalesForDateService(repository, logger);
  return new LoadSalesForPeriodController(serviceForPeriod, serviceForDate);
};

export const makeLoadHistoryByAllFilterController = () => {
  const repository = new SalesRepositoryMongoDB();
  const service = new LoadSalesByAllFiltersService(repository, logger);
  return new LoadHistoryByAllFilterController(service);
};
