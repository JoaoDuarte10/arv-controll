require('dotenv').config();
import { Request } from 'express';
import { JwtAdapter } from '../../../../../../src/domain/usecases/adapter/JwtAdapter';
import { Jwt } from '../../../../../../src/infrastructure/implementations/Jwt';
import { AuthenticatedLoginMiddleware } from '../../../../../../src/entrypoint/http/controllers/middlewares/authenticated-login';
import { UnauthorizedException } from '../../../../../../src/entrypoint/http/exceptions/Unauthorized';
import { InvalidTokenException } from '../../../../../../src/entrypoint/http/exceptions/invalid-token';

describe('AuthenticatedLogin', () => {
  let httpRequest: Request;
  let sut: AuthenticatedLoginMiddleware;
  let jwtAdapter: JwtAdapter;
  let idUser = '123456';

  beforeEach(() => {
    jwtAdapter = new Jwt();

    httpRequest = {
      headers: {
        authorization: jwtAdapter.createToken(
          { id: idUser },
          process.env.SECRECT_TOKEN as string,
          1,
        ),
      },
    } as any;

    sut = new AuthenticatedLoginMiddleware(jwtAdapter);
  });

  it('should return void with user authenticated', async () => {
    const result = sut.handle(httpRequest);

    expect(result).toBeUndefined();
    expect(httpRequest.headers['id-user']).toBe(idUser);
  });

  it('shoud return exception when authorization is null', () => {
    httpRequest.headers.authorization = null as any;

    expect(() => sut.handle(httpRequest)).toThrowError(InvalidTokenException);
  });

  it('should return exception with user not authorized', () => {
    httpRequest.headers.authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM`;

    expect(() => sut.handle(httpRequest)).toThrowError(UnauthorizedException);
  });
});
