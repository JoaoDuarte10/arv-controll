import { Controller } from '../../../contracts/controller';
import { FinishSchedule } from '../../../../domain/usecases/schedule/finish-schedule';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';

export class FinishScheduleController implements Controller {
  constructor(private readonly scheduleService: FinishSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { id } = req.body;
    const id_user = req.headers.id_user as string;

    try {
      await this.scheduleService.execute({
        id_user: id_user.toString(),
        id: id.toString(),
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
