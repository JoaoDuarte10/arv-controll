import { Controller } from '../../../contracts/controller';
import { FindClientService } from '../../../../application/services/client/find-clients';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { ClientViewModel } from '../../../view-model';

import { Request } from 'express';

export class FindAllClientController implements Controller {
  constructor(private readonly clientUseCase: FindClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<ClientViewModel[] | Response>> {
    const { id_user } = req.headers;

    try {
      const findAll = await this.clientUseCase.findAll(JSON.stringify(id_user));
      return {
        statusCode: 200,
        data: findAll,
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
