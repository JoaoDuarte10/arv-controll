interface ISegment {
  segment: string;
}

interface SegmentRepository {
  find(id_user: string): Promise<ISegment[]>;
  findByName(input: {
    id_user: string;
    segment: string;
  }): Promise<ISegment | ISegment[]>;
  create(input: { id_user: string; segment: string }): Promise<void>;
  update(input: {
    id: string;
    id_user: string;
    segment: string;
  }): Promise<void>;
  delete(input: { id_user: string; id: string }): Promise<void>;
}

export { ISegment, SegmentRepository };
