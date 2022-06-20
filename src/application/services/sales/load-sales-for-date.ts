import { Sales } from 'src/domain/entities/sales';
import { LoadSalesForDate } from '../../../domain/usecases/sales/load-sales-for-date';
import { SalesRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';

export class LoadSalesForDateService implements LoadSalesForDate {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id_user: string, date: string): Promise<Sales[]> {
    if (new Date(date) > new Date()) {
      throw {
        type: 'inputs_invalids',
        message: 'Invalid Date',
      };
    }

    try {
      const result = await this.salesRepository.findByDate(id_user, date);
      return result;
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSalesByDate: ${error.message}`,
      );
    }
  }
}
