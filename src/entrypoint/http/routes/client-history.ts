import { adaptRoute } from '../adapters/expres-router';
import {
  makeCreateClientHistoryController,
  makeLoadHistoryByClientController,
  makeLoadHistoryByDateController,
  makeLoadHistoryByPeriodController,
} from '../../factories';

import { Router } from 'express';
import { makeLoadHistoryByAllFiltersController } from '../../factories/client-history';
import { makeAuthenticatedLoginMiddleware } from '../../factories/middlewares/authenticated-login';
import { adapteMiddleware } from '../adapters/express-middleware';

export const clientHistoryRoutes = (router: Router): void => {
  router.post(
    '/history/create',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeCreateClientHistoryController()),
  );
  router.get(
    '/history/client',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadHistoryByClientController()),
  );
  router.get(
    '/history/date',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadHistoryByDateController()),
  );
  router.get(
    '/history/period',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadHistoryByPeriodController()),
  );
  router.get(
    '/history/all-filters',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadHistoryByAllFiltersController()),
  );
};
