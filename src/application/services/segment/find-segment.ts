import {
  FindSegmentUseCase,
  Segment,
} from '../../../domain/usecases/segment/find-segment';
import { SegmentRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';

export class FindSegmentService implements FindSegmentUseCase {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<Segment[]> {
    try {
      const segment = await this.segmentRepository.find();
      return segment;
    } catch (error) {
      this.logger.error(`Error SegmentUseCase: ${error.message}`);
    }
  }
}
