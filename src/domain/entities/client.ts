import {
  INotificationError,
  NotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class ClientEntity {
  private notification: INotificationError;

  constructor(private props: IClientEntity) {
    this.notification = new NotificationError();
    this.valideteProps();
    this.validationEmail();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get idclients() {
    return this.idclients;
  }

  private set idclients(value: number) {
    this.props.idclients = value;
  }

  get idusers() {
    return this.props.idusers;
  }

  private set idusers(value: number) {
    this.props.idusers = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get phone() {
    return this.props.phone;
  }

  private set phone(value: string) {
    this.props.phone = value;
  }

  get idsegments() {
    return this.props.idsegments;
  }

  private set idsegments(value: number) {
    this.props.idsegments = value;
  }

  private valideteProps() {
    if (!this.props.idusers) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid idUser',
      });
    }
    if (!this.props.name.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Name',
      });
    }
    if (!this.props.phone.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Phone',
      });
    }
  }

  private validationEmail() {
    if (!this.props.email) {
      delete this.props.email;
    }
  }

  updateName(name: string) {
    if (!name.trim()) throw new Error('Invalid name');
    this.name = name.trim();
  }

  updateEmail(email: string) {
    if (!email.trim()) throw new Error('Invalid email');
    this.email = email.trim();
  }

  updatePhone(phone: string) {
    if (!phone.trim()) throw new Error('Invalid phone');
    this.phone = phone.trim();
  }

  updateSegment(segment: number) {
    this.props.idsegments = segment;
  }

  returnProps() {
    return this.props;
  }

  isValidPhone(): boolean {
    const replacePhone = this.phone.replace('_', '').toString();
    return replacePhone.length < 16 && replacePhone.length > 1 ? false : true;
  }
}

export type IClientEntity = {
  idclients?: number;
  idusers?: number;
  idsegments?: number;
  name: string;
  email: string;
  phone: string;
};
