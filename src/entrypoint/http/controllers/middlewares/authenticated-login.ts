// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Request } from 'express';
import { Middleware } from '../../../contracts/middleware';
import { HttpRequest } from '../../../contracts/http';
import { JwtAdapter } from '../../../../domain/usecases/adapter/JwtAdapter';
import { UnauthorizedException } from '../../exceptions/Unauthorized';
import { InvalidTokenException } from '../../exceptions/invalid-token';

export class AuthenticatedLoginMiddleware implements Middleware {
  constructor(private readonly jwt: JwtAdapter) {}

  handle(req: HttpRequest<Request>): void {
    const authToken = req.headers.authorization;

    if (!authToken) throw new InvalidTokenException();

    try {
      const token = this.jwt.validateToken(
        authToken,
        process.env.SECRECT_TOKEN,
      );

      req.headers['id-user'] = token.idusers;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
