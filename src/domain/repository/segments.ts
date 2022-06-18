interface ISegment {
  segment: string;
}

interface SegmentRepository {
  find(): Promise<ISegment[]>;
}

export { ISegment, SegmentRepository };
