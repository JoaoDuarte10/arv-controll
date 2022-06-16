import { ISegment, SegmentRepository } from '../../domain/repository';
import { Segment } from '../models';

class SegmentRepositoryMongo implements SegmentRepository {
  async findSegment(): Promise<ISegment[]> {
    const getSegment = await Segment.find();
    return getSegment;
  }
}

export { SegmentRepositoryMongo };
