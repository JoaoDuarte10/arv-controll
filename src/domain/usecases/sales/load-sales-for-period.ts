import { Sales } from '../../entities/sales';

export interface LoadSalesForPeriod {
  execute: (params: SalesPeriod) => Promise<Sales[]>;
}

type SalesPeriod = {
  id_user: string;
  date1: string;
  date2: string;
};
