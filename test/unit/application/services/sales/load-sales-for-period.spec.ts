import { LoadSalesForPeriodService } from '../../../../../src/application/services/sales/load-sales-for-period';
import { SalesModel } from '../../../../../src/application/models/sales';

describe('Load Sales For Period', () => {
  let salesRepository: {
    findByPeriod: () => Promise<SalesModel[]>;
  };
  let sut = {} as LoadSalesForPeriodService;

  beforeEach(() => {
    salesRepository = {
      findByPeriod: () => {
        return new Promise((resolve, reject) =>
          resolve([
            {
              id_user: 'any_id',
              client: 'any_client',
              description: 'any_desc',
              date: new Date().toISOString(),
              price: 'any-price',
            },
          ]),
        );
      },
    };
    sut = new LoadSalesForPeriodService(salesRepository as any);
  });

  it('should return sales by period', async () => {
    const result = sut.execute({
      id_user: 'any_id',
      date1: new Date().toISOString(),
      date2: new Date().toISOString(),
    });

    expect(result).toBeDefined();
  });
});
