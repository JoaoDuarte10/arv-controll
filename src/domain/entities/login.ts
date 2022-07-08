import { NotificationError } from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class LoginEntity {
  private notification: NotificationError;

  constructor(public props: Login) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get id() {
    return this.props.id;
  }

  get user() {
    return this.props.user;
  }

  get password() {
    return this.props.password;
  }

  insertId(id: string) {
    this.props.id = id;
  }

  private validateProps() {
    if (!this.props.user.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Name',
      });
    }
    if (!this.props.password.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Password',
      });
    }
  }

  validateLogin(login: Login): LoginOutput {
    if (this.user === login.user && this.password === login.password) {
      return { id: this.id, user: this.user };
    }
    this.notification.addError({
      type: 'unauthorized',
      message: 'Name or Password Invalid',
    });
    throw new NotificationErrorException(this.notification.getErros());
  }

  invalidLogin() {
    this.notification.addError({
      type: 'unauthorized',
      message: 'Name or Password Invalid',
    });
    throw new NotificationErrorException(this.notification.getErros());
  }

  returnProps() {
    return this.props;
  }
}

export type Login = {
  id?: string;
  user: string;
  password: string;
};

export type LoginOutput = {
  id: string;
  user: string;
};
