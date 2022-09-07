import { Jwt } from '../../../infrastructure/implementations/Jwt';
import { AuthenticatedLoginMiddleware } from '../../http/controllers/middlewares/authenticated-login';

export const makeAuthenticatedLoginMiddleware = () => {
  const jwt = new Jwt();
  return new AuthenticatedLoginMiddleware(jwt);
};
