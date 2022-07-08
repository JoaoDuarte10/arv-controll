import {
  NotificationError,
  NotificationErrorProps,
} from '../../../../src/application/notification/notification-error';
describe('Notificatio Error', () => {
  it('should add a new error', () => {
    const sut = new NotificationError();
    const error: NotificationErrorProps = {
      type: 'InvalidCredentials',
      message: 'Invalid Credentials',
    };

    sut.addError(error);

    expect(sut.hasErrors()).toBe(true);
    expect(sut.getErros()[0]).toStrictEqual(error);
    expect(sut.getErros().length).toBe(1);
  });

  it('should get messages errors', () => {
    const sut = new NotificationError();
    const error: NotificationErrorProps = {
      type: 'InvalidCredentials',
      message: 'Invalid Credentials',
    };

    sut.addError(error);

    expect(sut.getMessages(error.type)).toBe(`${error.type}: ${error.message}`);
  });
});
