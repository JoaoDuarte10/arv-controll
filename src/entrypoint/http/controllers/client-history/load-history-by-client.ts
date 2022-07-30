import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { TYPE_INPUT_INVALIDS } from '../../../../application/utils/type-errors';

import { Request } from 'express';
import { LoadHistoryByClient } from '../../../../domain/usecases/clients-history/load-history-by-client';
import { ClientHistoryViewModel } from '../../../view-model/client-history';

export class LoadHistoryByClientController implements Controller {
  constructor(private readonly loadHistoryByClient: LoadHistoryByClient) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<ClientHistoryViewModel[] | Response>> {
    const client = req.query.client as string;
    const id_user = req.headers['id-user'] as string;

    try {
      const result = await this.loadHistoryByClient.execute({
        id_user,
        client,
      });

      if (result.length === 0) return { statusCode: 404 };

      return { statusCode: 201, data: result };
    } catch (error) {
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
