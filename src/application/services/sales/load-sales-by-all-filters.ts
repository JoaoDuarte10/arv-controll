import { Sales } from 'src/domain/entities/sales';
import { LoadSalesByAllFilters } from '../../../domain/usecases/sales/load-sales-by-all-filters';
import { SalesRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';

export class LoadSalesByAllFiltersService implements LoadSalesByAllFilters {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    client: string;
    date1: string;
    date2: string;
  }): Promise<Sales[]> {
    try {
      const date2 = params.date2 || params.date1;

      return await this.salesRepository.findByAllFilters(
        params.id_user,
        params.client,
        params.date1,
        date2,
      );
    } catch (error) {
      this.logger.error(
        `Error Load Sales By All Filters Service function findByAllFilters: ${error.message}`,
      );
    }
  }
}
