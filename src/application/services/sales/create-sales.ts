import { CreateSalesUseCase } from '../../../domain/usecases/sales/create-sales';
import { SalesRepository } from '../../../domain/repository';
import { SalesEntity } from '../../../domain/entities/sales';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SalesModel } from '../../models/sales';
import { ClientHistoryRepository } from '../../../domain/repository/client-history';

export class CreateSalesService implements CreateSalesUseCase {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly clientHistoryRepository: ClientHistoryRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: SalesModel): Promise<void> {
    const sales = new SalesEntity(params);

    if (!sales.isValidSales()) {
      await this.clientHistoryRepository.save({
        id_user: params.id_user,
        client: params.client,
        description: params.description,
        date: params.date,
      });

      return;
    }
    try {
      await this.salesRepository.create(sales);
    } catch (error) {
      this.logger.error(
        `Error CreateSalesService function saveSales: ${error.message}`,
      );
    }
  }
}
