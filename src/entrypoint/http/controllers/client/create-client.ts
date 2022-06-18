import { Controller, HttpResponse } from '../../../contracts';
import { HttpRequest } from '../../../contracts/http';
import { CreateClient } from '../../../../domain/usecases/client/create-client';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';

export class CreateClientController implements Controller {
  constructor(private clientUseCase: CreateClient) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { name, email, phone, segment } = req.body;
    const id_user = JSON.stringify(req.headers.id_user);

    const invalidParameters = {
      statusCode: 200,
      data: {
        type: 'inputs_invalids',
        message: 'Invalids parameters',
      },
    };

    if (!name || !phone) {
      return invalidParameters;
    }

    try {
      await this.clientUseCase.execute({
        id_user,
        name,
        email,
        phone,
        segment,
      });

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