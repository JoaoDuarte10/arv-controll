import { ClientHistory } from '../../entities/clients-history';

export interface LoadHistoryByAllFilters {
  execute(params: Input): Promise<ClientHistory[]>;
}

type Input = {
  id_user: string;
  client: string;
  date1: string;
  date2: string;
};
