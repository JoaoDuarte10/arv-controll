import { IClientEntity } from '../../entities/client';

export interface FindClient {
  find: (id_user: string, id: string) => Promise<IClientEntity>;
  findAll: (id_user: string) => Promise<IClientEntity[]>;
  findBySegment: (id_user: string, segment: string) => Promise<IClientEntity[]>;
}
