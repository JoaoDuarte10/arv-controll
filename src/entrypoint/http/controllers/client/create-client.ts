/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { Controller, HttpResponse } from '../../../contracts';
import { HttpRequest } from '../../../contracts/http';
import { CreateClient } from '../../../../domain/usecases/client/create-client';

export class CreateClientController implements Controller {
  constructor(private clientUseCase: CreateClient) {}

  async handle(req: HttpRequest<Request>): Promise<HttpResponse<any>> {
    const { id_user, name, email, phone, segment } = req.body;

    const invalidParameters = {
      statusCode: 200,
      data: {
        type: 'inputs_invalids',
        message: 'Invalids parameters',
      },
    };

    if (!name || !phone) {
      console.log(id_user, name, email, phone, segment);
      return invalidParameters;
    }

    if (
      phone.replace('_', '').toString().length < 16 &&
      phone.replace('_', '').toString().length > 1
    ) {
      return invalidParameters;
    }

    try {
      await this.clientUseCase.create({
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
