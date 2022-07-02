import { Schedule } from '../../entities/schedule';

export interface LoadAllExpiredSchedules {
  execute: (id_user: string) => Promise<Schedule[]>;
}
