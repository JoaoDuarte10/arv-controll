import {
  NotificationError,
  INotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';

export class SegmentEntity {
  private notification: INotificationError;
  constructor(private props: Segment) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
  }

  get idsegments() {
    if (this.props.idsegments) {
      return this.props.idsegments;
    }
  }

  get idusers() {
    return this.props.idusers;
  }

  get segment() {
    return this.props.segment;
  }

  private validateProps() {
    if (!this.props.idusers) {
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
  idusers: number;
  idsegments?: number;
  segment: string;
};
