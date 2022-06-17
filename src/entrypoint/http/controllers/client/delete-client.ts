import { Controller } from '../../../contracts/controller';
import { DeleteClientService } from '../../../../data/services/client/delete-client';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Response } from '../../../contracts/response-request';
import { HttpRequest } from '../../../contracts/http';

import { Request } from 'express';

export class DeleteClientController implements Controller {
  constructor(private readonly clientUseCase: DeleteClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { id } = req.body;
    const { id_user } = req.headers;

    try {
      await this.clientUseCase.delete(JSON.stringify(id_user), id);
      return { statusCode: 201 };
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
