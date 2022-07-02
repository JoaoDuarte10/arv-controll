import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { SalesViewModel } from '../../../view-model/sales';
import { HttpRequest } from '../../../contracts/http';
import { LoadSalesForClient } from '../../../../domain/usecases/sales/load-sales-for-client';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';

export class LoadSalesForClientController implements Controller {
  constructor(private readonly salesService: LoadSalesForClient) {}
  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SalesViewModel[] | Response>> {
    const client = req.query.client as string;
    const id_user: string = req.headers.id_user as string;

    try {
      const result = await this.salesService.execute({
        id_user,
        client,
      });

      if (!result || result.length === 0) {
        return { statusCode: 404 };
      }
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
