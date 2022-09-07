require('dotenv').config();
import { Request } from 'express';
import { JwtAdapter } from '../../../../../../src/domain/usecases/adapter/JwtAdapter';
import { Jwt } from '../../../../../../src/infrastructure/implementations/Jwt';
import { AuthenticatedLoginMiddleware } from '../../../../../../src/entrypoint/http/controllers/middlewares/authenticated-login';
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
});
