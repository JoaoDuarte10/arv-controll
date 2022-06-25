import { Schedule } from '../../entities/schedule';

export interface LoadAllSchedules {
  execute: (id_user: string) => Promise<Schedule[]>;
}
