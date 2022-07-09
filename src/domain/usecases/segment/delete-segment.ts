export interface DeleteSegment {
  execute: (input: { id: string; id_user: string }) => Promise<void>;
}
