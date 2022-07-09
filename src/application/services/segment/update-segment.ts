import { UpdateSegment } from '../../../domain/usecases/segment/update-segment';
import { SegmentRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SegmentEntity } from '../../../domain/entities/segment';

export class UpdateSegmentService implements UpdateSegment {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    id: string;
    segment: string;
  }): Promise<void> {
    try {
      const segment = new SegmentEntity(params);

      await this.segmentRepository.update({
        id_user: segment.id_user,
        id: segment.id,
        segment: segment.segment,
      });
    } catch (error) {
      this.logger.error(`Error in update segment service: ${error.message}`);
    }
  }
}
