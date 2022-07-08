import { Schedule } from '../../entities/schedule';

export interface LoadSchedulesByDate {
  execute: (params: Input) => Promise<Schedule[]>;
}

type Input = {
  id_user: string;
  date: string;
};
