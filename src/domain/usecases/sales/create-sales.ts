import { Sales } from '../../entities/sales';
export interface CreateSalesUseCase {
  execute: (params: CreateSalesInput) => Promise<void>;
}

export type CreateSalesInput = Sales;
