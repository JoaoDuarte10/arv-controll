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

export default (router: Router): void => {
  router.post('/new-schedule', adaptRoute(makeCreateScheduleController()));
  router.put('/schedule', adaptRoute(makeUpdateScheduleController()));
  router.delete('/schedule', adaptRoute(makeDeleteScheduleController()));
  router.post('/finish-schedule', adaptRoute(makeFinishScheduleController()));
  router.get('/all-schedule', adaptRoute(makeLoadAllScheduleController()));
  router.get('/schedule', adaptRoute(makeLoadScheduleByDateController()));
};
