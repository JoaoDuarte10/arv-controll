import { Request } from 'express';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { ScheduleViewModel } from '../../../view-model/schedule';
import { LoadScheduleByClient } from '../../../../domain/usecases/schedule/load-by-client';

export class LoadScheduleByClientController implements Controller {
  constructor(private readonly scheduleService: LoadScheduleByClient) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<ScheduleViewModel[] | Response>> {
    const client = req.query.client as string;
    const id_user = req.headers['id-user'] as string;

    try {
      const schedules = await this.scheduleService.execute({
        id_user,
        client,
      });

      if (schedules.length === 0) return { statusCode: 404 };

      return {
        statusCode: 200,
        data: schedules.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)),
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
