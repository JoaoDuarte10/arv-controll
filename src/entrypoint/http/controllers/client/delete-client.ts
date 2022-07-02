import { Controller } from '../../../contracts/controller';
import { DeleteClientService } from '../../../../application/services/client/delete-client';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Response } from '../../../contracts/response-request';
import { HttpRequest } from '../../../contracts/http';

import { Request } from 'express';
import { TYPE_NOT_EXISTS } from '../../../../application/utils/type-errors';

export class DeleteClientController implements Controller {
  constructor(private readonly clientUseCase: DeleteClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const id = req.query.id as string;
    const id_user = req.headers.id_user as string;

    try {
      await this.clientUseCase.execute(id_user, id);
      return { statusCode: 201 };
    } catch (error) {
      if (error.type === TYPE_NOT_EXISTS) {
        return { statusCode: 404 };
      }

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
