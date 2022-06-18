import { adaptRoute } from '../adapters/expres-router';
import { makeValidateLoginController } from '../../factories';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/authenticate', adaptRoute(makeValidateLoginController()));
};