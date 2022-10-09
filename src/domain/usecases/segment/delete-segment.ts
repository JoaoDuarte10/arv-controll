export interface DeleteSegment {
  execute: (input: {
    segment: number;
    idsegments: number;
    idusers: number;
  }) => Promise<void>;
}
