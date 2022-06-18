import { Sales } from 'src/domain/entities/sales';
import { CreateSalesUseCase } from '../../../domain/usecases/sales/create-sales';
import { SalesRepository } from '../../../domain/repository';
import { SalesEntity } from '../../../domain/entities/sales';
import { ILogger } from '../../../infrastructure/utils/logger';

export class CreateSalesService implements CreateSalesUseCase {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: Sales): Promise<void> {
    const sales = new SalesEntity(params);

    if (!sales.isValidSales()) {
      // implementar evento
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
