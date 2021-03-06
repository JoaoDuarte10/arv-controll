import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { UpdateClient } from '../../../../domain/usecases/client/update-client';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';
import { TYPE_NOT_EXISTS } from '../../../../application/utils/type-errors';

export class UpdateClientController implements Controller {
  constructor(private clientUseCase: UpdateClient) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { id, name, email, phone, segment } = req.body;
    const id_user = req.headers['id-user'] as string;

    if (!name || !phone) {
      return {
        statusCode: 201,
        data: {
          type: 'inputs_invalids',
          message: 'Invalids parameters',
        },
      };
    }
    try {
      await this.clientUseCase.execute({
        id_user,
        id,
        name,
        email,
        phone,
        segment,
      });
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
