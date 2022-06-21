import { CreateSalesService } from '../../../../../src/application/services/sales/create-sales';
import { Sales } from '../../../../../src/domain/entities/sales';
describe('Create Sales Service', () => {
  let salesRepository: { create: () => Promise<void> };
  let sut = {} as CreateSalesService;
  let logger: { error: () => void };
  let loggerErrorSpy: {};
  let params = {} as Sales;

  beforeEach(() => {
    salesRepository = {
      create: () => new Promise((resolve) => resolve(jest.fn() as any)),
    };
    logger = { error: () => jest.fn() };
    sut = new CreateSalesService(salesRepository as any, logger as any);
    loggerErrorSpy = jest.spyOn(logger, 'error');
    params = {
      id_user: 'any_id',
      description: 'any_desc',
      date: 'any_date',
      price: 'any_price',
      client: 'any_client',
    };
  });

  it('should create a new sale', async () => {
    const result = await sut.execute(params);

    expect(result).toBeUndefined();
    expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
  });

  it('should return error with invalid params', async () => {
    try {
      params.price = '';
      await sut.execute(params);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('InvalidParams: Invalid Price');
    }
  });
});
