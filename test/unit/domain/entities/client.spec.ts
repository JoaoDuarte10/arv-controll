import { NotificationErrorException } from '../../../../src/domain/exceptions/notification-error-exception';
import {
  ClientEntity,
  IClientEntity,
} from '../../../../src/domain/entities/client';

describe('Client Entity', () => {
  let clientParams: IClientEntity;

  beforeEach(() => {
    clientParams = {
      id_user: '123',
      name: 'Joao',
      email: 'joao@main.com',
      phone: '(35) 9 9999 - 9999',
      segment: 'frequente',
    };
  });

  it('should create a new client entity', () => {
    const client = new ClientEntity(clientParams);
    expect(client.props).toStrictEqual(clientParams);
  });

  it('should return a new exception with invalid params', () => {
    clientParams.name = '';
    clientParams.email = '';

    expect(() => new ClientEntity(clientParams)).toThrowError(
      NotificationErrorException,
    );
  });

  it('should update name client entity', () => {
    const client = new ClientEntity(clientParams);
    client.updateName('Joao Duarte');

    expect(client.name).toBe('Joao Duarte');
  });

  it('should return error with invalid name', () => {
    const client = new ClientEntity(clientParams);

    expect(() => client.updateName(' ')).toThrow();
  });

  it('should update email client entity', () => {
    const client = new ClientEntity(clientParams);
    client.updateEmail('updateMail@mail.com');

    expect(client.email).toBe('updateMail@mail.com');
  });

  it('should return error with invalid email', () => {
    const client = new ClientEntity(clientParams);

    expect(() => client.updateEmail(' ')).toThrow();
  });

  it('should update phone client entity', () => {
    const client = new ClientEntity(clientParams);
    client.updatePhone('99999999');

    expect(client.phone).toBe('99999999');
  });

  it('should return error with invalid phone', () => {
    const client = new ClientEntity(clientParams);

    expect(() => client.updatePhone(' ')).toThrow();
  });

  it('should update segment client entity', () => {
    const client = new ClientEntity(clientParams);
    client.updateSegment('raro');

    expect(client.segment).toBe('raro');
  });

  it('should return error with invalid segment', () => {
    const client = new ClientEntity(clientParams);

    expect(() => client.updateSegment(' ')).toThrow();
  });

  it('should return props client entity', () => {
    const client = new ClientEntity(clientParams);

    expect(client.returnProps()).toStrictEqual(clientParams);
  });

  it('should return true with valid phone', () => {
    const client = new ClientEntity(clientParams);

    expect(client.isValidPhone()).toBe(true);
  });

  it('should return false with invalid phone', () => {
    const client = new ClientEntity(clientParams);
    client.updatePhone('99999999');

    expect(client.isValidPhone()).toBe(false);
  });
});
