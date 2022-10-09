export interface DeleteClient {
  execute: (id_user: number, id: number) => Promise<void>;
}
