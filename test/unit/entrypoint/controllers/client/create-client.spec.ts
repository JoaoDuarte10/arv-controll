import { CreateClientController } from '../../../../../src/entrypoint/http/controllers/client/create-client';
describe('Create Client Controller', () => {
  let clientService: { execute: () => Promise<void> };
  let sut: CreateClientController;
  let httpRequest = {} as any;

  beforeEach(() => {
    clientService = {
      execute: () => new Promise((resolve) => resolve(jest.fn() as any)),
    };
    sut = new CreateClientController(clientService);
    httpRequest = {
      headers: {
        id_user: 'any_id',
      },
      body: {
        name: 'any_name',
        email: 'any_email',
        phone: 'any_phone',
        segment: 'any_segment',
      },
    };
  });

  it('should return statusCode 201 a sucess', async () => {
    const result = await sut.handle(httpRequest);
    expect(result.statusCode).toBe(201);
    expect(result.data).toBeUndefined();
  });
});
