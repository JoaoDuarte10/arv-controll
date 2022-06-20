import { Sales } from '../../../../../src/domain/entities/sales';
import { LoadSalesForDateService } from '../../../../../src/application/services/sales/load-sales-for-date';

describe('Load Sales For Date', () => {
  let salesRepository: { findByDate: () => Promise<Sales[]> };
  let sut = {} as LoadSalesForDateService;
  let logger: { error: () => void };
  let loggerErrorSpy;

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
    logger = { error: () => jest.fn() };
    loggerErrorSpy = jest.spyOn(logger, 'error');

    sut = new LoadSalesForDateService(salesRepository as any, logger as any);
  });

  it('should return sales for date', async () => {
    const result = await sut.execute('any_id', new Date().toISOString());

    expect(new Date(result[0].date).getDate()).toBe(new Date().getDate());
  });

  it('should return error with date more than now', async () => {
    const date = new Date();

    try {
      await sut.execute(
        'any_id',
        new Date(date.setDate(date.getDate() + 5)).toISOString(),
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Invalid Date');
    }
  });

  it('should logger with error in find sales', async () => {
    jest.spyOn(salesRepository, 'findByDate').mockImplementationOnce(() => {
      throw new Error();
    });
    await sut.execute('any_id', new Date().toISOString());

    expect(loggerErrorSpy).toHaveBeenCalled();
  });
});
