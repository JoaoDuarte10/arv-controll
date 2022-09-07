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
import { adapteMiddleware } from '../adapters/express-middleware';
import { makeAuthenticatedLoginMiddleware } from '../../factories/middlewares/authenticated-login';

export const clientRoutes = (router: Router): void => {
  router.post(
    '/client/create',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeCreateClientController()),
  );
  router.put(
    '/client/update',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeUpdateClientController()),
  );
  router.get(
    '/client/load/:id',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeFindClientController()),
  );
  router.get(
    '/client/all',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeFindAllClientController()),
  );
  router.get(
    '/client/segment',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeFindBySegmentClientController()),
  );
  router.delete(
    '/client',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeDeleteClientController()),
  );
};
