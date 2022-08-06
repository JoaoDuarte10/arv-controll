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

  get idSchedule() {
    return this.props.idSchedule;
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
    if (!this.date.trim()) {
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
      this.props.qtdAtendimento = this.qtdAtendimento ? this.qtdAtendimento : 0;
      return;
    }
    this.props.qtdAtendimento = 0;
  }

  isValidForFinish() {
    return this.qtdAtendimento >= this.qtdTotalAtendimento || !this.pacote;
  }

  isFirstAttendaceForPacote() {
    return this.qtdAtendimento === 1 || !this.pacote;
  }

  isNotPacoteRemoveCalls() {
    if (!this.pacote) {
      this.props.qtdTotalAtendimento = 0;
      this.props.qtdAtendimento = 0;
    }
  }

  isValidPhone() {
    const replacePhone = this.phone.replace('_', '').toString();
    return replacePhone.length < 16 && replacePhone.length > 1 ? false : true;
  }

  isValidSales(): boolean {
    const price = parseFloat(this.props.price.substring(2).replace(',', '.'));
    return price ? true : false;
  }

  addAttendace() {
    this.props.qtdAtendimento = this.props.qtdAtendimento + 1;
  }

  registerIdSchedule(idSchedule: string) {
    this.props.idSchedule = idSchedule;
  }

  returnProps() {
    return this.props;
  }
}

export type Schedule = {
  id_user: string;
  idSchedule?: string;
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
