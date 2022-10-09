export interface CreateSegment {
  execute: (input: CreateSegmentInput) => Promise<void>;
}

type CreateSegmentInput = {
  idusers: number;
  segment: string;
};
