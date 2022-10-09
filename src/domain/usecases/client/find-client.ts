import { IClientEntity } from '../../entities/client';

export interface FindClient {
  find: (id_user: number, id: number) => Promise<IClientEntity>;
  findAll: (id_user: number) => Promise<IClientEntity[]>;
  findBySegment: (id_user: number, segment: number) => Promise<IClientEntity[]>;
}
