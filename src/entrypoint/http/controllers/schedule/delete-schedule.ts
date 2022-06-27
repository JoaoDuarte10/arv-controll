import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { DeleteSchedule } from '../../../../domain/usecases/schedule/delete-schedule';

import { Request } from 'express';

export class DeleteScheduleController implements Controller {
  constructor(private readonly scheduleService: DeleteSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const id = req.query.id as string;
    const id_user = req.headers.id_user as string;

    try {
      await this.scheduleService.execute({
        id_user,
        id,
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
