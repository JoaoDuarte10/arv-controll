import { NotificationError } from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class LoginEntity {
  private notification: NotificationError;

  constructor(private props: Login) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get idusers() {
    return this.props.idusers;
  }

  get user() {
    return this.props.user;
  }

  get password() {
    return this.props.password;
  }

  insertId(idusers: number) {
    this.props.idusers = idusers;
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

  validateLogin(user: string, password: string): LoginOutput {
    if (this.user === user && this.password === password) {
      return { idusers: this.idusers, user: this.user };
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
  idusers?: number;
  user: string;
  password: string;
  phone: string;
};

export type LoginOutput = {
  idusers: number;
  user: string;
};
