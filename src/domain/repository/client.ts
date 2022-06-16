import { IClientEntity } from '../entities/client';

type IClient = IClientEntity;

interface ClientRepository {
  newClient({ id_user, name, email, phone, segment }: IClient): Promise<void>;
  updateClient({
    id_user,
    id,
    name,
    email,
    phone,
    segment,
  }: IClient): Promise<IClient[]>;
  findAllClients(id_user: string): Promise<IClient[]>;
  findClient(id_user: string, id: string): Promise<IClient>;
  findByEmail(id_user: string, email: string): Promise<IClient>;
  findByName(id_user: string, name: string): Promise<IClient>;
  findBySegment(id_user: string, segment: string): Promise<IClient[]>;
  deleteClient(id_user: string, id: string): Promise<void>;
}

export { IClient, ClientRepository };
