export interface DeleteClient {
  execute: (id_user: string, id: string) => Promise<void>;
}
