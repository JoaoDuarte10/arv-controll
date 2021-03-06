import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { SalesViewModel } from '../../../view-model/sales';
import { Response } from '../../../contracts/response-request';
import { LoadSalesForDate } from '../../../../domain/usecases/sales/load-sales-for-date';
import { HttpRequest } from '../../../contracts/http';
import { Request } from 'express';

export class LoadSalesForDateController implements Controller {
  constructor(private readonly salesService: LoadSalesForDate) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SalesViewModel[] | Response>> {
    const date = req.query.date as string;
    const id_user: string = req.headers['id-user'] as string;

    if (!date) {
      return { statusCode: 400 };
    }

    try {
      const result = await this.salesService.execute(id_user, date);

      if (result.length === 0) return { statusCode: 404 };

      return {
        statusCode: 200,
        data: result,
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
