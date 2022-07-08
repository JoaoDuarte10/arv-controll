import { Sales } from '../../entities/sales';

export interface LoadSalesForDate {
  execute: (id_user: string, date: string) => Promise<Sales[]>;
}
