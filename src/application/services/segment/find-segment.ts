import { FindSegmentUseCase } from '../../../domain/usecases/segment/find-segment';
import { SegmentRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SegmentModel } from '../../models/segment';

export class FindSegmentService implements FindSegmentUseCase {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<SegmentModel[]> {
    try {
      const segment = await this.segmentRepository.find();
      return segment;
    } catch (error) {
      this.logger.error(`Error SegmentUseCase: ${error.message}`);
    }
  }
}
