import { adaptRoute } from '../adapters/expres-router';
import {
  makeCreateScheduleController,
  makeUpdateScheduleController,
  makeDeleteScheduleController,
  makeFinishScheduleController,
  makeLoadAllScheduleController,
  makeLoadScheduleByDateController,
} from '../../factories/schedule';

import { Router } from 'express';
import { makeLoadScheduleByClientController } from '../../factories/schedule';
import { makeAuthenticatedLoginMiddleware } from '../../../entrypoint/factories/middlewares/authenticated-login';
import { adapteMiddleware } from '../adapters/express-middleware';

export const scheduleRoutes = (router: Router): void => {
  router.post(
    '/schedule/new',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeCreateScheduleController()),
  );
  router.put(
    '/schedule/update',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeUpdateScheduleController()),
  );
  router.delete(
    '/schedule',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeDeleteScheduleController()),
  );
  router.post(
    '/schedule/finish',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeFinishScheduleController()),
  );
  router.get(
    '/schedule/expireds',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadAllScheduleController()),
  );
  router.get(
    '/schedule/date',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadScheduleByDateController()),
  );
  router.get(
    '/schedule/client',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadScheduleByClientController()),
  );
};
