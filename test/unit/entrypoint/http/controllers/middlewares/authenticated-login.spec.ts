require('dotenv').config();
import { Request } from 'express';
import { JwtAdapter } from '../../../../../../src/domain/usecases/adapter/JwtAdapter';
import { Jwt } from '../../../../../../src/infrastructure/implementations/Jwt';
import { AuthenticatedLoginMiddleware } from '../../../../../../src/entrypoint/http/controllers/middlewares/authenticated-login';
import { Unauthorized } from '../../../../../../src/entrypoint/http/exceptions/Unauthorized';

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
          process.env.TOKEN_LOGIN as string,
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

  it('should return exception with user not authorized', () => {
    httpRequest.headers.authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM`;

    expect(() => sut.handle(httpRequest)).toThrowError(Unauthorized);
  });
});
