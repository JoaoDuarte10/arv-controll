export interface DeleteClient {
  delete: (id_user: string, id: string) => Promise<void>;
}
