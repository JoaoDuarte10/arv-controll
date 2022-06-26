import { Controller } from '../../../contracts/controller';
import { LoadAllSchedules } from '../../../../domain/usecases/schedule/load-all-schedules';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Schedule } from '../../../../entrypoint/view-model/schedule';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';

export class LoadAllScheduleController implements Controller {
  constructor(private readonly scheduleService: LoadAllSchedules) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<Schedule[] | Response>> {
    const id_user = req.headers.id_user as string;
    try {
      const schedules = await this.scheduleService.execute(id_user);
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
