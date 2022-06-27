import { Controller } from '../../../contracts/controller';
import { LoadSchedulesByDate } from '../../../../domain/usecases/schedule/load-schedule-by-date';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Request } from 'express';
import { Schedule } from '../../../view-model/schedule';
import { Response } from '../../../contracts/response-request';

export class LoadScheduleByDateController implements Controller {
  constructor(private readonly scheduleService: LoadSchedulesByDate) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<Schedule[] | Response>> {
    const date = req.query.date as string;
    const id_user = req.headers.id_user as string;

    try {
      const schedules = await this.scheduleService.execute({
        id_user,
        date,
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
