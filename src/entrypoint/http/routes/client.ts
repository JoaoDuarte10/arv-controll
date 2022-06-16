import { makeCreateClientController } from '../../factories';
import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/create-client', adaptRoute(makeCreateClientController()));
};
