import { Request } from 'express';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { SalesViewModel } from '../../../view-model/sales';
import { Response } from '../../../contracts/response-request';
import { LoadSalesByAllFilters } from '../../../../domain/usecases/sales/load-sales-by-all-filters';

export class LoadSalesForAllFiltersController implements Controller {
  constructor(private readonly salesServiceAllFilters: LoadSalesByAllFilters) {}
  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SalesViewModel[] | Response>> {
    const { client, date1, date2 } = req.query;
    const id_user: string = req.headers['id-user'] as string;

    if ((!date1 && !date2) || date1 === '') return { statusCode: 400 };

    try {
      const result = await this.salesServiceAllFilters.execute({
        id_user,
        client: client as string,
        date1: date1 as string,
        date2: date2 as string,
      });

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
