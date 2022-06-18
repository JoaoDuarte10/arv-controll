import { adaptRoute } from '../adapters/expres-router';

import { Router } from 'express';
import { makeValidateLoginController } from '../../factories/login';

export default (router: Router): void => {
  router.post('/authenticate', adaptRoute(makeValidateLoginController()));
};
