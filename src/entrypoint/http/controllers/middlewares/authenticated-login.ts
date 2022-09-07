// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Request } from 'express';
import { Middleware } from '../../../contracts/middleware';
import { HttpRequest } from '../../../contracts/http';
import { JwtAdapter } from '../../../../domain/usecases/adapter/JwtAdapter';
import { Unauthorized } from '../../exceptions/Unauthorized';

export class AuthenticatedLoginMiddleware implements Middleware {
  constructor(private readonly jwt: JwtAdapter) {}

  handle(req: HttpRequest<Request>): void {
    const userToken = req.headers.authorization;
    const token = this.jwt.validateToken(userToken, process.env.TOKEN_LOGIN);

    if (!token) {
      throw new Unauthorized();
    }

    req.headers['id-user'] = token.id;
  }
}
