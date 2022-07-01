import { ISegment, SegmentRepository } from '../../domain/repository';
import { Segment } from '../models';

class SegmentRepositoryMongo implements SegmentRepository {
  async find(id_user: string): Promise<ISegment[]> {
    const segments = await Segment.find({ id_user: id_user });

    if (segments) {
      return segments.map((item) => {
        return { segment: item.segment };
      });
    }
  }
}

export { SegmentRepositoryMongo };
