export interface FindSegmentUseCase {
  execute: (id_user: string) => Promise<Segment[]>;
}

export type Segment = {
  segment: string;
};
