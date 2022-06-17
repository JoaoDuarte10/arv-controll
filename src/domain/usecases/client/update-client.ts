import { IClientEntity } from '../../entities';

export interface UpdateClient {
  execute: (params: IClientEntity) => Promise<void>;
}

export type UpdateClientInput = {
  id?: string;
  id_user: string;
  name: string;
  email: string;
  phone: string;
  segment?: string;
};
