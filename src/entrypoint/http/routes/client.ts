import { adaptRoute } from '../adapters/expres-router';
import {
  makeCreateClientController,
  makeFindClientController,
  makeFindAllClientController,
  makeFindBySegmentClientController,
  makeUpdateClientController,
  makeDeleteClientController,
} from '../../factories';

import { Router } from 'express';

export const clientRoutes = (router: Router): void => {
  router.post('/client/create', adaptRoute(makeCreateClientController()));
  router.put('/client/update', adaptRoute(makeUpdateClientController()));
  router.get('/client/:id', adaptRoute(makeFindClientController()));
  router.get('/client/all', adaptRoute(makeFindAllClientController()));
  router.get(
    '/client/segment',
    adaptRoute(makeFindBySegmentClientController()),
  );
  router.delete('/client', adaptRoute(makeDeleteClientController()));
};
