import {
  NotificationError,
  INotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class SalesEntity {
  private notification: INotificationError;

  constructor(public props: Sales) {
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

  get price() {
    return this.props.price;
  }

  private validateProps() {
    if (!this.props.id_user.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Id User',
      });
    }
    if (!this.props.client.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Client',
      });
    }
    if (!this.props.description.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Description',
      });
    }
    if (!this.props.date.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Date',
      });
    }
    if (!this.props.price.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Price',
      });
    }
  }

  isValidSales(): boolean {
    const price = parseInt(this.price.substring(2).replace(',', ''));
    return price ? true : false;
  }

  returnProps() {
    return this.props;
  }
}

export type Sales = {
  id_user: string;
  client: string;
  description: string;
  date: string;
  price: string;
};
