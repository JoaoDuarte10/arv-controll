export interface DeleteSegment {
  execute: (input: {
    segment: string;
    id: string;
    id_user: string;
  }) => Promise<void>;
}
