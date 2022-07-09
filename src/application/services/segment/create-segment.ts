import { CreateSegment } from '../../../domain/usecases/segment/create-segment';
import { SegmentEntity } from '../../../domain/entities/segment';
import { SegmentRepository } from 'src/domain/repository';
import { Logger } from 'winston';
import { TYPE_ALREADY_EXISTS } from '../../utils/type-errors';

export class CreateSegmentService implements CreateSegment {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: Logger,
  ) {}

  async execute(input: { id_user: string; segment: string }): Promise<void> {
    const segment = new SegmentEntity(input);

    const alreadExists = await this.segmentRepository.findByName({
      id_user: segment.id_user,
      segment: segment.segment,
    });

    if (alreadExists) {
      throw {
        type: TYPE_ALREADY_EXISTS,
        message: 'Segment already exists',
      };
    }

    try {
      await this.segmentRepository.create(segment.returnProps());
    } catch (error) {
      this.logger.error(`Error in create segment service: ${error.message}`);
    }
  }
}
