import { SalesEntity, Sales } from '../../../../src/domain/entities/sales';
import { NotificationErrorException } from '../../../../src/domain/exceptions/notification-error-exception';

describe('Sales Entity', () => {
  let params = {} as Sales;

  beforeEach(() => {
    params = {
      id_user: 'any_id',
      description: 'any_desc',
      client: 'any_client',
      date: 'any_date',
      price: 'R$0,00',
    };
  });

  it('should create a new sales', () => {
    const sales = new SalesEntity(params);

    expect(sales.returnProps()).toStrictEqual(params);
  });

  it('should return true with valid sales', () => {
    params.price = 'R$10,00';
    const sales = new SalesEntity(params);

    expect(sales.isValidSales()).toBe(true);
  });

  it('should return false with not valid sales', () => {
    const sales = new SalesEntity(params);

    expect(sales.isValidSales()).toBe(false);
  });

  it('should return error with invalid props', () => {
    params.id_user = '';
    params.client = '';
    params.description = '';
    params.date = '';
    params.price = '';

    expect(() => new SalesEntity(params)).toThrowError(
      NotificationErrorException,
    );
  });
});
