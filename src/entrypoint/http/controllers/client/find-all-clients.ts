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
    const id_user = req.headers['id-user'] as string;

    try {
      const result = await this.clientUseCase.findAll(id_user);

      if (result.length === 0) {
        return { statusCode: 404 };
      }

      return {
        statusCode: 200,
        data: result,
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
