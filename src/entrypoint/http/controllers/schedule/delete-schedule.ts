import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { DeleteSchedule } from '../../../../domain/usecases/schedule/delete-schedule';

import { Request } from 'express';
import { TYPE_NOT_EXISTS } from '../../../../application/utils/type-errors';

export class DeleteScheduleController implements Controller {
  constructor(private readonly scheduleService: DeleteSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const id = req.query.id as string;
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
