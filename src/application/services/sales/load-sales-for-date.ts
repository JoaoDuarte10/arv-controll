import { LoadSalesForDate } from '../../../domain/usecases/sales/load-sales-for-date';
import { SalesRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SalesModel } from '../../models/sales';

export class LoadSalesForDateService implements LoadSalesForDate {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id_user: string, date: string): Promise<SalesModel[]> {
    try {
      return await this.salesRepository.findByDate(id_user, date);
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSalesByDate: ${error.message}`,
      );
    }
  }
}
