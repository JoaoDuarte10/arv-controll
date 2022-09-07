import {
  makeFindSegmentController,
  makeCreateSegmentController,
} from '../../factories/segments';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import {
  makeUpdateSegmentController,
  makeDeleteSegmentController,
} from '../../factories/segments';
import { makeAuthenticatedLoginMiddleware } from '../../../entrypoint/factories/middlewares/authenticated-login';
import { adapteMiddleware } from '../adapters/express-middleware';

export const segmentsRoutes = (router: Router): void => {
  router.get(
    '/segments',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeFindSegmentController()),
  );
  router.post(
    '/segment/create',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeCreateSegmentController()),
  );
  router.put(
    '/segment/update',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeUpdateSegmentController()),
  );
  router.delete(
    '/segment',
    adapteMiddleware(makeAuthenticatedLoginMiddleware()),
    adaptRoute(makeDeleteSegmentController()),
  );
};
