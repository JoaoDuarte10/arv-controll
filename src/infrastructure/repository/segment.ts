import { ISegment, SegmentRepository } from '../../domain/repository';
import { Segment } from '../models';

class SegmentRepositoryMongo implements SegmentRepository {
  async findByName(input: {
    id_user: string;
    segment: string;
  }): Promise<ISegment | ISegment[]> {
    const segments = await Segment.find({
      id_user: input.id_user,
      segment: input.segment,
    });

    if (!segments || segments.length === 0) return;

    return segments.map((item) => ({
      segment: item.segment,
    }));
  }

  async create(input: { id_user: string; segment: string }): Promise<void> {
    const segment = new Segment({
      id_user: input.id_user,
      segment: input.segment,
    });
    await segment.save();
  }

  async find(id_user: string): Promise<ISegment[]> {
    const segments = await Segment.find({ id_user: id_user });

    if (segments) {
      return segments.map((item) => ({
        id: item._id,
        segment: item.segment,
      }));
    }
  }
}

export { SegmentRepositoryMongo };
