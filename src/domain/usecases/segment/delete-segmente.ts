export interface DeleteSegment {
  execute: (params: DeleteSegmentInput) => Promise<void>;
}

type DeleteSegmentInput = {
  id_user: string;
  id: string;
};
