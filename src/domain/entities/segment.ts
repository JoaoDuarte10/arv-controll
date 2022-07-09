import {
  NotificationError,
  INotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class SegmentEntity {
  private notification: INotificationError;
  constructor(public props: Segment) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get id() {
    if (this.props.id) {
      return this.props.id;
    }
  }

  get id_user() {
    return this.props.id_user;
  }

  get segment() {
    return this.props.segment;
  }

  private validateProps() {
    if (!this.props.id_user.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Id User',
      });
    }
    if (!this.props.segment.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Segment',
      });
    }
  }

  public returnProps() {
    return this.props;
  }
}

export type Segment = {
  id_user: string;
  id?: string;
  segment: string;
};
