import {
  INotificationError,
  NotificationError,
} from '../../application/notification/notification-error';
import { NotificationErrorException } from '../exceptions/notification-error-exception';
export class ScheduleEntity {
  private notification: INotificationError;
  actualAttendace: number;

  constructor(public props: Schedule) {
    this.notification = new NotificationError();
    this.validateProps();
    if (this.notification.hasErrors()) {
      throw new NotificationErrorException(this.notification.getErros());
    }
    this.defineActualAttendace();
  }

  get id_user() {
    return this.props.id_user;
  }

  get id() {
    return this.props.id;
  }

  get client() {
    return this.props.client;
  }

  get procedure() {
    return this.props.procedure;
  }

  get date() {
    return this.props.date;
  }

  get time() {
    return this.props.time;
  }

  get price() {
    return this.props.time;
  }

  get phone() {
    return this.props.phone;
  }

  get isDefeated() {
    return this.props.isDefeated;
  }

  get pacote() {
    return this.props.pacote;
  }

  get qtdAtendimento() {
    return this.props.qtdAtendimento;
  }

  get qtdTotalAtendimento() {
    return this.props.qtdTotalAtendimento;
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
    if (!this.procedure.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Procedure',
      });
    }
    if (!this.date.trim() || new Date(this.date) < new Date()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Date',
      });
    }
    if (!this.price.trim()) {
      this.notification.addError({
        type: 'InvalidParams',
        message: 'Invalid Price',
      });
    }
  }

  private defineActualAttendace() {
    if (this.pacote) {
      this.actualAttendace = this.qtdAtendimento + 1;
    } else {
      this.actualAttendace = 0;
    }
  }

  isValidForFinish() {
    return this.actualAttendace >= this.qtdTotalAtendimento || !this.pacote;
  }

  isFirstForPacote() {
    return this.actualAttendace === 1 || !this.pacote;
  }

  returnProps() {
    return this.props;
  }
}

export type Schedule = {
  id_user: string;
  id?: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone?: string;
  isDefeated?: boolean;
  pacote?: boolean;
  qtdAtendimento?: number;
  qtdTotalAtendimento?: number;
};
