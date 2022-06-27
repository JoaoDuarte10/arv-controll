import { adaptRoute } from '../adapters/expres-router';
import { makeHealthCheckController } from '../../factories';

import { Router } from 'express';

export const healthCheckRoutes = (router: Router): void => {
  router.get('/health-check', adaptRoute(makeHealthCheckController()));
};
