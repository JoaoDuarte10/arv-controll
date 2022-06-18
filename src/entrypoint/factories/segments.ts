import { FindSegmentService } from '../../application/services/segment/find-segment';
import { SegmentRepositoryMongo } from '../../infrastructure/repository';
import { logger } from '../../infrastructure/utils/logger';
import { FindSegmentController } from '../http/controllers/segment/find-segment';

export const makeFindSegmentController = () => {
  const repository = new SegmentRepositoryMongo();
  const service = new FindSegmentService(repository, logger);
  return new FindSegmentController(service);
};
