import { logger } from '../../infrastructure/utils/logger';
import {
  SalesRepositoryMongoDB,
  ScheduleRepositoryMongoDB,
} from '../../infrastructure/repository';
import { CreateScheduleService } from '../../application/services/schedule/create-schedule';
import { CreateScheduleController } from '../http/controllers/schedule/create-schedule';
import { DeleteScheduleService } from '../../application/services/schedule/delete-schedule';
import { DeleteScheduleController } from '../http/controllers/schedule/delete-schedule';
import { FinishScheduleService } from '../../application/services/schedule/finish-schedule';
import { FinishScheduleController } from '../http/controllers/schedule/finish-schedule';
import { LoadAllExpiredScheduleService } from '../../application/services/schedule/load-all-expired-schedule';
import { LoadAllScheduleController } from '../http/controllers/schedule/load-all-expired-schedule';
import { LoadScheduleByDateService } from '../../application/services/schedule/load-schedule-by-date';
import { LoadScheduleByDateController } from '../http/controllers/schedule/load-schedule-by-date';
import { UpdateScheduleService } from '../../application/services/schedule/update-schedule';
import { UpdateScheduleController } from '../http/controllers/schedule/update-schedule';
import { ClientHistoryRepositoryMongo } from '../../infrastructure/repository/client-history';
import { LoadScheduleByClientController } from '../http/controllers/schedule/load-schedule-by-clients';
import { LoadScheduleByClientService } from '../../application/services/schedule/load-schedule-by-client';

const repository = new ScheduleRepositoryMongoDB();

export const makeCreateScheduleController = () => {
  const service = new CreateScheduleService(repository, logger);
  return new CreateScheduleController(service);
};

export const makeDeleteScheduleController = () => {
  const service = new DeleteScheduleService(repository, logger);
  return new DeleteScheduleController(service);
};

export const makeFinishScheduleController = () => {
  const scheduleRepository = new ScheduleRepositoryMongoDB();
  const historyRepository = new ClientHistoryRepositoryMongo();
  const service = new FinishScheduleService(
    scheduleRepository,
    historyRepository,
    logger,
  );
  return new FinishScheduleController(service);
};

export const makeLoadAllScheduleController = () => {
  const service = new LoadAllExpiredScheduleService(repository, logger);
  return new LoadAllScheduleController(service);
};

export const makeLoadScheduleByDateController = () => {
  const service = new LoadScheduleByDateService(repository, logger);
  return new LoadScheduleByDateController(service);
};

export const makeUpdateScheduleController = () => {
  const service = new UpdateScheduleService(repository, logger);
  return new UpdateScheduleController(service);
};

export const makeLoadScheduleByClientController = () => {
  const service = new LoadScheduleByClientService(repository, logger);
  return new LoadScheduleByClientController(service);
};
