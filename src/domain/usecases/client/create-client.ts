export interface CreateClient {
  execute: (params: CreateClientInput) => Promise<void>;
}

export type CreateClientInput = {
  id_user: string;
  name: string;
  email: string;
  phone: string;
  segment?: string;
};
