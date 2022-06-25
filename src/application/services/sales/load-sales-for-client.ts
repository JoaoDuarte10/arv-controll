import { Sales } from 'src/domain/entities/sales';
import { LoadSalesForClient } from '../../../domain/usecases/sales/load-sales-for-client';
import { SalesRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';

export class LoadSalesForClientService implements LoadSalesForClient {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: { id_user: string; client: string }): Promise<Sales[]> {
    try {
      const result = await this.salesRepository.findByClient(
        params.id_user,
        params.client,
      );

      if (!result) {
        throw {
          type: 'not_found',
          message: 'Sales Not Found',
        };
      }

      return result;
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSaleByClient: ${error.message}`,
      );
    }
  }
}
