import { ILogger } from '@infrastructure/utils/logger';
import { SegmentRepository, ISegment } from '@domain/repository';

class SegmentUseCase {
  constructor(
    private segmentsRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}
  async findSegment(): Promise<ISegment[]> {
    try {
      const segment = await this.segmentsRepository.findSegment();
      return segment;
    } catch (error) {
      this.logger.error(`Error SegmentUseCase: ${error.message}`);
    }
  }
}

export { SegmentUseCase };
