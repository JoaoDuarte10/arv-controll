import { HttpResponse, Response } from '../../../../entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { IClientEntity } from '../../../../domain/entities/client';
import { FindClientService } from '../../../../application/services/client/find-clients';
import { HttpRequest } from '../../../contracts/http';

import { Request } from 'express';

export class FindClientController implements Controller {
  constructor(private readonly clientUseCase: FindClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<IClientEntity | Response>> {
    const { id_user } = req.headers;
    const { id } = req.params;

    try {
      const findClient = await this.clientUseCase.find(
        JSON.stringify(id_user),
        id,
      );
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
