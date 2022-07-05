import { Controller } from '../../../contracts/controller';
import { FinishSchedule } from '../../../../domain/usecases/schedule/finish-schedule';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';
import { TYPE_NOT_EXISTS } from '../../../../application/utils/type-errors';

export class FinishScheduleController implements Controller {
  constructor(private readonly scheduleService: FinishSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { id } = req.body;
    const id_user = req.headers['id-user'] as string;

    try {
      await this.scheduleService.execute({
        id_user,
        id,
      });
      return { statusCode: 201 };
    } catch (error) {
      if (error.type === TYPE_NOT_EXISTS) {
        return { statusCode: 404 };
      }

      return {
        statusCode: 500,
        data: error.message,
      };
    }
  }
}
