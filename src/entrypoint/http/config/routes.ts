import cors from 'cors';
import { Router, Express } from 'express';
import { readdirSync } from 'fs';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(cors());
  app.use('/api', router);
  readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    (await import(`../routes/${fileName}`)).default(router);
  });
};
