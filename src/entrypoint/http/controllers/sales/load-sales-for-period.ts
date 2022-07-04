import { Request } from 'express';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { SalesViewModel } from '../../../view-model/sales';
import { Response } from '../../../contracts/response-request';
import { LoadSalesForPeriod } from '../../../../domain/usecases/sales/load-sales-for-period';
import { LoadSalesForDate } from '../../../../domain/usecases/sales/load-sales-for-date';

export class LoadSalesForPeriodController implements Controller {
  constructor(
    private readonly salesServicePeriod: LoadSalesForPeriod,
    private readonly salesServiceDate: LoadSalesForDate,
  ) {}
  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SalesViewModel[] | Response>> {
    const { date1, date2 } = req.query;
    const id_user: string = req.headers.id_user as string;

    if ((!date1 && !date2) || date1 === '') return { statusCode: 400 };

    try {
      if (date1 && date2) {
        const resultForPeriod = await this.salesServicePeriod.execute({
          id_user,
          date1: date1 as string,
          date2: date2 as string,
        });

        if (resultForPeriod.length === 0) return { statusCode: 404 };
        return {
          statusCode: 200,
          data: resultForPeriod,
        };
      }

      if (date1 && !date2) {
        const resultForDate = await this.salesServiceDate.execute(
          id_user,
          date1 as string,
        );

        if (resultForDate.length === 0) return { statusCode: 404 };

        return {
          statusCode: 200,
          data: resultForDate,
        };
      }

      return { statusCode: 404 };
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
