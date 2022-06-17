import { NotificationErrorProps } from '../../application/notification/notification-error';

export class NotificationErrorException extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      `${errors[0].type}: ${errors
        .map((error) => `${error.message}`)
        .join(', ')}`,
    );
  }
}
