import { adaptRoute } from '../adapters/expres-router';
import {
  makeCreateClientHistoryController,
  makeLoadHistoryByClientController,
  makeLoadHistoryByDateController,
  makeLoadHistoryByPeriodController,
} from '../../factories';

import { Router } from 'express';
import { makeLoadHistoryByAllFiltersController } from '../../factories/client-history';

export const clientHistoryRoutes = (router: Router): void => {
  router.post(
    '/history/create',
    adaptRoute(makeCreateClientHistoryController()),
  );
  router.get(
    '/history/client',
    adaptRoute(makeLoadHistoryByClientController()),
  );
  router.get('/history/date', adaptRoute(makeLoadHistoryByDateController()));
  router.get(
    '/history/period',
    adaptRoute(makeLoadHistoryByPeriodController()),
  );
  router.get(
    '/history/all-filters',
    adaptRoute(makeLoadHistoryByAllFiltersController()),
  );
};
