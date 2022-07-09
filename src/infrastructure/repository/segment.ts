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

  async find(id_user: string): Promise<ISegment[]> {
    const segments = await Segment.find({ id_user: id_user });

    if (segments) {
      return segments.map((item) => ({
        id: item._id,
        segment: item.segment,
      }));
    }
  }

  async create(input: { id_user: string; segment: string }): Promise<void> {
    const segment = new Segment({
      id_user: input.id_user,
      segment: input.segment,
    });
    await segment.save();
  }

  async update(input: {
    id: string;
    id_user: string;
    segment: string;
  }): Promise<void> {
    await Segment.findOneAndUpdate(
      {
        id_user: input.id_user,
        _id: input.id,
      },
      {
        segment: input.segment,
      },
    );
  }

  async delete(input: { id_user: string; id: string }): Promise<void> {
    await Segment.findByIdAndDelete({ id_user: input.id_user, _id: input.id });
  }
}

export { SegmentRepositoryMongo };
