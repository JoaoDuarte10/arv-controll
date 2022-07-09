export interface UpdateSegment {
  execute: (params: UpdateSegmentInput) => Promise<void>;
}

type UpdateSegmentInput = {
  id_user: string;
  id: string;
  segment: string;
};
