import { LoginEntity } from '../../../../src/domain/entities/login';
import { NotificationErrorException } from '../../../../src/domain/exceptions/notification-error-exception';
describe('Login Entity', () => {
  it('should create a new instance login', () => {
    const params = {
      user: 'any_name',
      password: 'any_password',
    };
    const login = new LoginEntity(params);
    expect(login.returnProps()).toStrictEqual(params);
  });

  it('should return error with invalid props', () => {
    const params = {
      user: '',
      password: '',
    };
    expect(() => new LoginEntity(params)).toThrowError(
      NotificationErrorException,
    );
  });

  it('should return name with valid login', () => {
    const params = {
      user: 'any_name',
      password: 'any_password',
    };
    const login = new LoginEntity(params);

    expect(login.validateLogin(params).user).toBe('any_name');
  });

  it('should return error with invalid login', () => {
    const params = {
      user: 'any_name',
      password: 'any_password',
    };
    const login = new LoginEntity(params);

    expect(() =>
      login.validateLogin({ user: 'name', password: 'password' }),
    ).toThrowError(NotificationErrorException);
  });
});
