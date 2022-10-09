export interface CreateClient {
  execute: (params: CreateClientInput) => Promise<void>;
}

export type CreateClientInput = {
  idusers: number;
  name: string;
  email: string;
  phone: string;
  idsegments?: number;
};
