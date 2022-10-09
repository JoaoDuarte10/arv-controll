import { FindSegmentUseCase } from '../../../domain/usecases/segment/find-segment';
import { SegmentRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { SegmentModel } from '../../models/segment';

export class FindSegmentService implements FindSegmentUseCase {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(idusers: number): Promise<SegmentModel[]> {
    try {
      const result = await this.segmentRepository.find(idusers);

      return result.map((item) => {
        return {
          idsegments: item.idsegments,
          segment: item.name,
          createdAt: item.created_at,
        };
      });
    } catch (error) {
      this.logger.error(`Error SegmentUseCase: ${error.message}`);
    }
  }
}
