import { SegmentRepository, ISegment } from '../segmentsRepository';
import { Segment } from '../../models/segments';

class SegmentRepositoryMongo implements SegmentRepository {
  async findSegment(): Promise<ISegment[]> {
    const getSegment = await Segment.find();
    return getSegment;
  }
}

export { SegmentRepositoryMongo };
