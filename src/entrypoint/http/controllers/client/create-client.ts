import { Controller, HttpResponse } from '../../../contracts';
import { HttpRequest } from '../../../contracts/http';
import { CreateClient } from '../../../../domain/usecases/client/create-client';
import { Response } from '../../../contracts/response-request';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../../../application/utils/type-errors';

import { Request } from 'express';

export class CreateClientController implements Controller {
  constructor(private clientUseCase: CreateClient) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { name, email, phone, idsegments } = req.body;
    const idusers = parseInt(req.headers['id-user'].toString(), 10);

    try {
      if (!name || !phone) {
        return {
          statusCode: 400,
          data: {
            type: 'inputs_invalids',
            message: 'Invalids parameters',
          },
        };
      }

      await this.clientUseCase.execute({
        idusers,
        name,
        email,
        phone,
        idsegments,
      });

      return { statusCode: 201 };
    } catch (error) {
      if (error.type === TYPE_ALREADY_EXISTS) {
        return { statusCode: 409 };
      }

      if (error.type === TYPE_INPUT_INVALIDS) {
        return { statusCode: 400 };
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
