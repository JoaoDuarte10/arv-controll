interface ISegment {
  segment: string;
}

interface SegmentRepository {
  find(id_user: string): Promise<ISegment[]>;
}

export { ISegment, SegmentRepository };
