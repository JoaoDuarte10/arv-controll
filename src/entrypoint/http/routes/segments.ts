import { makeFindSegmentController } from '../../factories/segments';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';

export const segmentsRoutes = (router: Router): void => {
  router.get('/segments', adaptRoute(makeFindSegmentController()));
};
