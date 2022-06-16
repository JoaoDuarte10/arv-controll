import { IClientEntity } from '../../entities';

export interface UpdateClient {
  update: (params: IClientEntity) => Promise<void>;
}
