import { Controller, HttpResponse } from '../../../contracts';
import { HttpRequest } from '../../../contracts/http';
import { CreateClient } from '../../../../domain/usecases/client/create-client';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../../../application/utils/type-errors';

export class CreateClientController implements Controller {
  constructor(private clientUseCase: CreateClient) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { name, email, phone, segment } = req.body;
    const id_user = req.headers['id-user'] as string;

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
        id_user,
        name,
        email,
        phone,
        segment,
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
