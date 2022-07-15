import { DeleteSegment } from '../../../domain/usecases/segment/delete-segment';
import { ClientRepository, SegmentRepository } from 'src/domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { TYPE_ALREADY_EXISTS } from '../../utils/type-errors';

export class DeleteSegmentService implements DeleteSegment {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(input: {
    segment: string;
    id: string;
    id_user: string;
  }): Promise<void> {
    const alreadyClientInSegment = await this.clientRepository.findBySegment(
      input.id_user,
      input.segment,
    );

    if (alreadyClientInSegment) {
      throw {
        type: TYPE_ALREADY_EXISTS,
        message: 'Exists client this segment.',
      };
    }

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
