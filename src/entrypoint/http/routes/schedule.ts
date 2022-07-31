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

export const scheduleRoutes = (router: Router): void => {
  router.post('/schedule/new', adaptRoute(makeCreateScheduleController()));
  router.put('/schedule/update', adaptRoute(makeUpdateScheduleController()));
  router.delete('/schedule', adaptRoute(makeDeleteScheduleController()));
  router.post('/schedule/finish', adaptRoute(makeFinishScheduleController()));
  router.get('/schedule/expireds', adaptRoute(makeLoadAllScheduleController()));
  router.get('/schedule/date', adaptRoute(makeLoadScheduleByDateController()));
  router.get(
    '/schedule/client',
    adaptRoute(makeLoadScheduleByClientController()),
  );
};
