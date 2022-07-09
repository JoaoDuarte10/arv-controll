import { DeleteSegment } from '../../../domain/usecases/segment/delete-segment';
import { SegmentRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';

export class DeleteSegmentService implements DeleteSegment {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(input: { id: string; id_user: string }): Promise<void> {
    try {
      await this.segmentRepository.delete({
        id_user: input.id_user,
        id: input.id,
      });
    } catch (error) {
      this.logger.info(`Error in delete segment service: ${error.message}`);
    }
  }
}
