import { Schedule } from '../../entities/schedule';

export interface LoadScheduleByClient {
  execute(params: Input): Promise<Schedule[]>;
}

type Input = {
  id_user: string;
  client: string;
};
