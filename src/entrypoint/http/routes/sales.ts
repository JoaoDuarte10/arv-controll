import { makeCreateSalesController } from '../../../entrypoint/factories/sales';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import { makeLoadHistoryByAllFilterController } from '../../factories/sales';
import {
  makeLoadSalesForPeriodController,
  makeLoadSalesForDateController,
  makeLoadSalesForClientController,
  makeLoadSalesForClientByPeriodController,
} from '../../factories/sales';
import { makeAuthenticatedLoginMiddleware } from '../../../entrypoint/factories/middlewares/authenticated-login';
import { adapteMiddleware } from '../adapters/express-middleware';

export const salesRoutes = (router: Router): void => {
  router.post(
    '/sales/new',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeCreateSalesController()),
  );
  router.get(
    '/sales/period-clients',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadSalesForClientByPeriodController()),
  );
  router.get(
    '/sales/clients',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadSalesForClientController()),
  );
  router.get(
    '/sales/today',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadSalesForDateController()),
  );
  router.get(
    '/sales/period',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadSalesForPeriodController()),
  );
  router.get(
    '/sales/all-filters',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeLoadHistoryByAllFilterController()),
  );
};
