import { HttpResponse, Response } from '../../../../entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { FindClientService } from '../../../../application/services/client/find-clients';
import { HttpRequest } from '../../../contracts/http';
import { ClientViewModel } from '../../../view-model';

import { Request } from 'express';

export class FindClientController implements Controller {
  constructor(private readonly clientUseCase: FindClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<ClientViewModel | Response>> {
    const id_user = req.headers.id_user as string;
    const id = req.params.id as string;

    try {
      const findClient = await this.clientUseCase.find(id_user, id);
      return {
        statusCode: 200,
        data: findClient,
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          type: 'error',
          message: error.message,
        },
      };
    }
  }
}
