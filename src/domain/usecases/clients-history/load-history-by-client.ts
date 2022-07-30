import { ClientHistory } from '../../entities/clients-history';

export interface LoadHistoryByClient {
  execute: (params: LoadHistoryByClientInput) => Promise<ClientHistory[]>;
}

export type LoadHistoryByClientInput = {
  id_user: string;
  client: string;
};
