import { makeCreateSalesController } from '../../../entrypoint/factories/sales';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/sales', adaptRoute(makeCreateSalesController()));
};
