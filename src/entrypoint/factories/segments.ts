import { FindSegmentService } from '../../application/services/segment/find-segment';
import { SegmentRepositoryMongo } from '../../infrastructure/repository';
import { logger } from '../../infrastructure/utils/logger';
import { FindSegmentController } from '../http/controllers/segment/find-segment';
import { CreateSegmentService } from '../../application/services/segment/create-segment';
import { CreateSegmentController } from '../http/controllers/segment/create-segment';

const repository = new SegmentRepositoryMongo();

export const makeFindSegmentController = () => {
  const service = new FindSegmentService(repository, logger);
  return new FindSegmentController(service);
};

export const makeCreateSegmentController = () => {
  const service = new CreateSegmentService(repository, logger);
  return new CreateSegmentController(service);
};
