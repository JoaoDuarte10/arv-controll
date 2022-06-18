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

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  private validateProps() {
    if (!this.props.name.trim()) {
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
    if (this.name === login.name && this.password === login.password) {
      return { id: this.id, name: this.name };
    }
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
  name: string;
  password: string;
};

export type LoginOutput = {
  id: string;
  name: string;
};
