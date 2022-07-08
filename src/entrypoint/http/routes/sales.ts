import { makeCreateSalesController } from '../../../entrypoint/factories/sales';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import {
  makeLoadSalesForPeriodController,
  makeLoadSalesForDateController,
  makeLoadSalesForClientController,
  makeLoadSalesForClientByPeriodController,
} from '../../factories/sales';

export const salesRoutes = (router: Router): void => {
  router.post('/sales/new', adaptRoute(makeCreateSalesController()));
  router.get(
    '/sales/period-clients',
    adaptRoute(makeLoadSalesForClientByPeriodController()),
  );
  router.get('/sales/clients', adaptRoute(makeLoadSalesForClientController()));
  router.get('/sales/today', adaptRoute(makeLoadSalesForDateController()));
  router.get('/sales/period', adaptRoute(makeLoadSalesForPeriodController()));
};
