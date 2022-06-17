import { IClientEntity } from '../entities/client';

type IClient = IClientEntity;

interface ClientRepository {
  create({ id_user, name, email, phone, segment }: IClient): Promise<void>;
  update({ id_user, id, name, email, phone, segment }: IClient): Promise<void>;
  findAll(id_user: string): Promise<IClient[]>;
  find(id_user: string, id: string): Promise<IClient>;
  findByEmail(id_user: string, email: string): Promise<IClient>;
  findByName(id_user: string, name: string): Promise<IClient>;
  findBySegment(id_user: string, segment: string): Promise<IClient[]>;
  delete(id_user: string, id: string): Promise<void>;
}

export { IClient, ClientRepository };
