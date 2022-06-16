import { IClientEntity } from '../../entities';

export interface CreateClient {
  create: (params: IClientEntity) => Promise<void>;
}
