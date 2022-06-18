export interface FindSegmentUseCase {
  execute: () => Promise<Segment[]>;
}

export type Segment = {
  segment: string;
};
