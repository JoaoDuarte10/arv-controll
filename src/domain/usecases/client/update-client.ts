export interface UpdateClient {
  execute: (params: UpdateClientInput) => Promise<void>;
}

export type UpdateClientInput = {
  idclients: number;
  idusers: number;
  idsegments: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
};
