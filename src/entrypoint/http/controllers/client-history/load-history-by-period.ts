import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { TYPE_INPUT_INVALIDS } from '../../../../application/utils/type-errors';

import { Request } from 'express';
import { ClientHistoryViewModel } from '../../../view-model/client-history';
import { LoadHistoryByPeriod } from '../../../../domain/usecases/clients-history/load-history-by-period';

export class LoadHistoryByPeriodController implements Controller {
  constructor(private readonly loadHistoryByPeriod: LoadHistoryByPeriod) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<ClientHistoryViewModel[] | Response>> {
    const { date1, date2 } = req.query;
    const id_user = req.headers['id-user'] as string;

    try {
      const result = await this.loadHistoryByPeriod.execute({
        id_user,
        date1: date1 as string,
        date2: date2 as string,
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
