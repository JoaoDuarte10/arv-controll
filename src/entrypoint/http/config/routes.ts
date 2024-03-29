import cors from 'cors';
import { Router, Express } from 'express';
import { clientRoutes } from '../routes/client';
import { healthCheckRoutes } from '../routes/health';
import { loginRoutes } from '../routes/login';
import { salesRoutes } from '../routes/sales';
import { scheduleRoutes } from '../routes/schedule';
import { segmentsRoutes } from '../routes/segments';
import { intelectoRoutes } from '../../../mvc-intelecto';
import { clientHistoryRoutes } from '../routes/client-history';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(cors());
  app.use('/api', router);

  clientRoutes(router);
  healthCheckRoutes(router);
  loginRoutes(router);
  salesRoutes(router);
  clientHistoryRoutes(router);
  scheduleRoutes(router);
  segmentsRoutes(router);
  intelectoRoutes(router);
};
