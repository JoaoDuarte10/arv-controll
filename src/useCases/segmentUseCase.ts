import { SegmentRepository, ISegment } from '../repository/segmentsRepository';
import { logger } from '../utils/logger';

class SegmentUseCase {
  constructor(private segmentsRepository: SegmentRepository) {}
  async findSegment(): Promise<ISegment[]> {
    try {
      const segment = await this.segmentsRepository.findSegment();
      return segment;
    } catch (error) {
      logger.error(`Error SegmentUseCase: ${error.message}`);
    }
  }
}

export { SegmentUseCase };
