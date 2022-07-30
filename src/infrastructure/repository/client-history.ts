import { ClientHistory } from 'src/domain/entities/clients-history';
import {
  ClientHistoryRepository,
  IClientHistory,
} from '../../domain/repository/client-history';
import { ClientsHistory } from '../models/clients-history';

export class ClientHistoryRepositoryMongo implements ClientHistoryRepository {
  async save({
    id_user,
    client,
    description,
    date,
  }: IClientHistory): Promise<void> {
    const clientsHistory = new ClientsHistory({
      id_user,
      client,
      description,
      date,
    });

    await clientsHistory.save();
  }

  async findByDate(id_user: string, date: string): Promise<ClientHistory[]> {
    const result = await ClientsHistory.find({ id_user, date });

    if (!result) return;

    return result.map((item) => {
      const { id_user, client, description, date } = item;
      return Object.assign(
        {},
        {
          id_user,
          client,
          description,
          date,
        },
      );
    });
  }

  async findByPeriod(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<ClientHistory[]> {
    const result = await ClientsHistory.find({
      id_user: id_user,
      date: { $gte: date1, $lte: date2 },
    }).sort({ date: 1 });

    if (!result) return;

    return result.map((item) => {
      const { id_user, client, description, date } = item;
      return Object.assign(
        {},
        {
          id_user,
          client,
          description,
          date,
        },
      );
    });
  }

  async findByClient(
    id_user: string,
    client: string,
  ): Promise<ClientHistory[]> {
    const result = await ClientsHistory.find({ id_user, client }).sort({
      date: 1,
    });

    if (!result) return;

    return result.map((item) => {
      const { id_user, client, description, date } = item;
      return Object.assign(
        {},
        {
          id_user,
          client,
          description,
          date,
        },
      );
    });
  }
}
