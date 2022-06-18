import { ISegment, SegmentRepository } from '../../domain/repository';
import { Segment } from '../models';

class SegmentRepositoryMongo implements SegmentRepository {
  async find(): Promise<ISegment[]> {
    const segments = await Segment.find();

    if (segments) {
      const allSegments = segments.map((item) => {
        return { segment: item.segment };
      });
      return allSegments;
    }
  }
}

export { SegmentRepositoryMongo };
