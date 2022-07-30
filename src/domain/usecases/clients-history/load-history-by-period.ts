import { ClientHistory } from '../../entities/clients-history';

export interface LoadHistoryByPeriod {
  execute: (params: LoadHistoryByPeriodInput) => Promise<ClientHistory[]>;
}

export type LoadHistoryByPeriodInput = {
  id_user: string;
  date1: string;
  date2: string;
};
