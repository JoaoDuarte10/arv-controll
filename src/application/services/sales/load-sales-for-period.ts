import { LoadSalesForPeriod } from '../../../domain/usecases/sales/load-sales-for-period';
import { SalesRepository } from '../../../domain/repository';
import { SalesModel } from '../../models/sales';

type SalesPeriod = {
  id_user: string;
  date1: string;
  date2: string;
};

export class LoadSalesForPeriodService implements LoadSalesForPeriod {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(params: SalesPeriod): Promise<SalesModel[]> {
    return await this.salesRepository.findByPeriod(
      params.id_user,
      params.date1,
      params.date2,
    );
  }
}
