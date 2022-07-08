import { Sales } from '../../entities/sales';

export interface LoadSalesForClient {
  execute: (params: Input) => Promise<Sales[]>;
}

type Input = {
  id_user: string;
  client: string;
};
