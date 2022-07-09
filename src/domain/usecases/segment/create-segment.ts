export interface CreateSegment {
  execute: (input: CreateSegmentInput) => Promise<void>;
}

type CreateSegmentInput = {
  id_user: string;
  segment: string;
};
