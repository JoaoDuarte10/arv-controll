import { SalesRepositoryMongoDB } from '../../infrastructure/repository';
import { CreateSalesService } from '../../application/services/sales/create-sales';
import { logger } from '../../infrastructure/utils/logger';
import { CreateSalesController } from '../http/controllers/sales/create-sales';

export const makeCreateSalesController = () => {
  const repository = new SalesRepositoryMongoDB();
  const service = new CreateSalesService(repository, logger);
  return new CreateSalesController(service);
};
