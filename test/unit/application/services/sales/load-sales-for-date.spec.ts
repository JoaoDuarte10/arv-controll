import { Sales } from '../../../../../src/domain/entities/sales';
import { LoadSalesForDateService } from '../../../../../src/application/services/sales/load-sales-for-date';

describe('Load Sales For Date', () => {
  let salesRepository: { findByDate: () => Promise<Sales[]> };

  beforeEach(() => {
    salesRepository = {
      findByDate: () => {
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
  });

  it('should return sales for date', async () => {
    const service = new LoadSalesForDateService(salesRepository as any);
    const result = await service.execute('any_id', new Date().toISOString());

    expect(new Date(result[0].date).getDate()).toBe(new Date().getDate());
  });
});
