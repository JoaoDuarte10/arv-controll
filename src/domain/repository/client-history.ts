import { ClientHistory } from '../entities/clients-history';

export type IClientHistory = ClientHistory;

export interface ClientHistoryRepository {
  save({ id_user, client, description, date }: IClientHistory): Promise<void>;
  findByDate(id_user: string, date: string): Promise<IClientHistory[]>;
  findByPeriod(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<IClientHistory[]>;
  findByClient(id_user: string, client: string): Promise<IClientHistory[]>;
  findByAllFilters(
    id_user: string,
    client: string,
    date1: string,
    date2: string,
  ): Promise<IClientHistory[]>;
}
