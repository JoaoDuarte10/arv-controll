import { FindSegmentService } from '../../application/services/segment/find-segment';
import {
  ClientRepositoryMongo,
  SegmentRepositoryMongo,
} from '../../infrastructure/repository';
import { logger } from '../../infrastructure/utils/logger';
import { FindSegmentController } from '../http/controllers/segment/find-segment';
import { CreateSegmentService } from '../../application/services/segment/create-segment';
import { CreateSegmentController } from '../http/controllers/segment/create-segment';
import { UpdateSegmentService } from '../../application/services/segment/update-segment';
import { UpdateSegmentController } from '../http/controllers/segment/update-segment';
import { DeleteSegmentService } from '../../application/services/segment/delete-segment';
import { DeleteSegmentController } from '../http/controllers/segment/delete-segment';

const repository = new SegmentRepositoryMongo();

export const makeFindSegmentController = () => {
  const service = new FindSegmentService(repository, logger);
  return new FindSegmentController(service);
};

export const makeCreateSegmentController = () => {
  const service = new CreateSegmentService(repository, logger);
  return new CreateSegmentController(service);
};

export const makeUpdateSegmentController = () => {
  const service = new UpdateSegmentService(repository, logger);
  return new UpdateSegmentController(service);
};

export const makeDeleteSegmentController = () => {
  const repositoryClient = new ClientRepositoryMongo();
  const service = new DeleteSegmentService(
    repository,
    repositoryClient,
    logger,
  );
  return new DeleteSegmentController(service);
};
