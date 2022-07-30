import { ClientHistory } from '../../entities/clients-history';

export interface LoadHistoryByDate {
  execute: (params: LoadHistoryByDateInput) => Promise<ClientHistory[]>;
}

export type LoadHistoryByDateInput = {
  id_user: string;
  date: string;
};
