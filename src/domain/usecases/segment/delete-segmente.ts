export interface DeleteSegment {
  execute: (params: DeleteSegmentInput) => Promise<void>;
}

type DeleteSegmentInput = {
  segment: string;
  id_user: string;
  id: string;
};
