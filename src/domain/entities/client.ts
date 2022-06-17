import {
  INotificationError,
  NotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class ClientEntity {
  private notification: INotificationError;

  constructor(public props: IClientEntity) {
    this.notification = new NotificationError();
    this.valideteProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get id() {
    return this.id;
  }

  private set id(value: string) {
    this.props.id = value;
  }

  get id_user() {
    return this.props.id_user;
  }

  private set id_user(value: string) {
    this.props.id_user = value;
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

  get segment() {
    return this.props.segment;
  }

  private set segment(value: string) {
    this.props.segment = value;
  }

  private valideteProps() {
    if (!this.props.id_user.trim()) {
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
    if (!this.props.email.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Email',
      });
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

  updateSegment(segment: string) {
    if (!segment.trim()) throw new Error('Invalid segment');
    this.segment = segment.trim();
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
  id?: string;
  id_user: string;
  name: string;
  email: string;
  phone: string;
  segment?: string;
};
