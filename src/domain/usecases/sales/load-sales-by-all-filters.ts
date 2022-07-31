import { Sales } from '../../entities/sales';

export interface LoadSalesByAllFilters {
  execute(params: Input): Promise<Sales[]>;
}

type Input = {
  id_user: string;
  client: string;
  date1: string;
  date2: string;
};
