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

export default (router: Router): void => {
  router.post('/create-client', adaptRoute(makeCreateClientController()));
  router.put('/update-client', adaptRoute(makeUpdateClientController()));
  router.get('/client/:id', adaptRoute(makeFindClientController()));
  router.get('/all-clients', adaptRoute(makeFindAllClientController()));
  router.get(
    '/client/:segment',
    adaptRoute(makeFindBySegmentClientController()),
  );
  router.delete('/client', adaptRoute(makeDeleteClientController()));
};
