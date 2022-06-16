import { ILogger } from '@infrastructure/utils/logger';
import { SalesRepository, ISales } from '@domain/repository';

class SalesUseCase {
  constructor(
    private salesRepository: SalesRepository,
    private readonly logger: ILogger,
  ) {}

  async saveSales({
    id_user,
    description,
    client,
    date,
    price,
  }: ISales): Promise<void> {
    try {
      await this.salesRepository.saveSales({
        id_user,
        description,
        client,
        date,
        price,
      });
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function saveSales: ${error.message}`,
      );
    }
  }

  async findSalesByDate(id_user: string, date: string): Promise<ISales[]> {
    try {
      const find = await this.salesRepository.findSaleByDate(id_user, date);
      return find;
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSalesByDate: ${error.message}`,
      );
    }
  }

  async findSalesByPeriod(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<ISales[]> {
    try {
      const find = await this.salesRepository.findSaleByPeriod(
        id_user,
        date1,
        date2,
      );
      return find;
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSalesByPeriod: ${error.message}`,
      );
    }
  }

  async findSaleByPeriodThatHasClientExists(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<ISales[]> {
    try {
      const find = await this.salesRepository.findSaleByPeriod(
        id_user,
        date1,
        date2,
      );
      return find.filter((item) => !!item.client);
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSaleByPeriodThatHasClientExists: ${error.message}`,
      );
    }
  }

  async findSaleByClient(id_user: string, client: string): Promise<ISales[]> {
    try {
      const find = await this.salesRepository.findSalesByClient(
        id_user,
        client,
      );
      return find;
    } catch (error) {
      this.logger.error(
        `Error SalesUseCase function findSaleByClient: ${error.message}`,
      );
    }
  }
}

export { SalesUseCase };
