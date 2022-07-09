import {
  makeFindSegmentController,
  makeCreateSegmentController,
} from '../../factories/segments';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import {
  makeUpdateSegmentController,
  makeDeleteSegmentController,
} from '../../factories/segments';

export const segmentsRoutes = (router: Router): void => {
  router.get('/segments', adaptRoute(makeFindSegmentController()));
  router.post('/segment/create', adaptRoute(makeCreateSegmentController()));
  router.put('/segment/update', adaptRoute(makeUpdateSegmentController()));
  router.delete('/segment', adaptRoute(makeDeleteSegmentController()));
};
