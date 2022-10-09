export interface FindSegmentUseCase {
  execute: (idusers: number) => Promise<Segment[]>;
}

export type Segment = {
  idsegments: number;
  segment: string;
  createdAt: string;
};
