export interface CreateClientHistory {
  execute: (params: CreateClientHistoryInput) => Promise<void>;
}

export type CreateClientHistoryInput = {
  id_user: string;
  client: string;
  description: string;
  date: string;
};
