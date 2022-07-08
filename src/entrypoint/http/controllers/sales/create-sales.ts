import { Controller } from '../../../contracts/controller';
import { CreateSalesUseCase } from '../../../../domain/usecases/sales/create-sales';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Request } from 'express';
import { Response } from '../../../contracts/response-request';

export class CreateSalesController implements Controller {
  constructor(private readonly salesService: CreateSalesUseCase) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { description, client, price, date } = req.body;
    const id_user: string = req.headers['id-user'] as string;

    try {
      await this.salesService.execute({
        id_user,
        description,
        client,
        date,
        price,
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
