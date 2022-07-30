import {
  INotificationError,
  NotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';

export class ClientsHistory {
  private notification: INotificationError;
  actualAttendace: number;

  constructor(public props: ClientHistory) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get id_user() {
    return this.props.id_user;
  }

  get client() {
    return this.props.client;
  }

  get description() {
    return this.props.description;
  }

  get date() {
    return this.props.date;
  }

  private validateProps() {
    if (!this.id_user.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Id User',
      });
    }
    if (!this.client.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Client',
      });
    }
    if (!this.description.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Description',
      });
    }
    if (!this.date.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Date',
      });
    }
  }

  returnProps() {
    return this.props;
  }
}

export type ClientHistory = {
  id_user: string;
  client: string;
  description: string;
  date: string;
};
