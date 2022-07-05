import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { SalesViewModel } from '../../../view-model/sales';
import { Response } from '../../../contracts/response-request';
import { LoadSalesForPeriod } from '../../../../domain/usecases/sales/load-sales-for-period';

import { Request } from 'express';

export class LoadSalesForClientByPeriodController implements Controller {
  constructor(private readonly salesService: LoadSalesForPeriod) {}
  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SalesViewModel[] | Response>> {
    const { date1, date2 } = req.body;
    const id_user: string = req.headers['id-user'] as string;

    if ((!date1 && !date2) || date1 === '') {
      return { statusCode: 400 };
    }

    try {
      const result = await this.salesService.execute({
        id_user,
        date1,
        date2,
      });

      if (result.length === 0) return { statusCode: 404 };

      return {
        statusCode: 200,
        data: result.filter((item) => !!item.client),
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
