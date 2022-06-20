import { Sales } from 'src/domain/entities/sales';
import { LoadSalesForDate } from '../../../domain/usecases/sales/load-sales-for-date';
import { SalesRepository } from '../../../domain/repository';

export class LoadSalesForDateService implements LoadSalesForDate {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(id_user: string, date: string): Promise<Sales[]> {
    try {
      const result = await this.salesRepository.findByDate(id_user, date);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
