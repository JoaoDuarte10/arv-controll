import { makeCreateSalesController } from '../../../entrypoint/factories/sales';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import {
  makeLoadSalesForPeriodController,
  makeLoadSalesForDateController,
  makeLoadSalesForClientController,
  makeLoadSalesForClientByPeriodController,
} from '../../factories/sales';

export default (router: Router): void => {
  router.post('/new-sales', adaptRoute(makeCreateSalesController()));
  router.post(
    '/sales-period-clients',
    adaptRoute(makeLoadSalesForClientByPeriodController()),
  );
  router.post('/sales-clients', adaptRoute(makeLoadSalesForClientController()));
  router.post('/sales-today', adaptRoute(makeLoadSalesForDateController()));
  router.post('/sales-period', adaptRoute(makeLoadSalesForPeriodController()));
};
