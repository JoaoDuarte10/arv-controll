export interface UpdateSegment {
  execute: (params: UpdateSegmentInput) => Promise<void>;
}

type UpdateSegmentInput = {
  idusers: number;
  idsegments: number;
  segment: string;
};
