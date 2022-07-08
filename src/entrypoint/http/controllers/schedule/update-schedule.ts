import { Controller } from '../../../contracts/controller';
import { UpdateSchedule } from '../../../../domain/usecases/schedule/update-schedule';
import { HttpResponse } from '../../../../entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../../../application/utils/type-errors';

export class UpdateScheduleController implements Controller {
  constructor(private readonly scheduleService: UpdateSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const {
      id,
      client,
      procedure,
      date,
      time,
      price,
      contact,
      pacote,
      qtdTotalAtendimento,
    } = req.body;

    const id_user = req.headers['id-user'] as string;

    if (!client || !procedure || !date || !time || !price) {
      return { statusCode: 400 };
    }
    try {
      await this.scheduleService.execute({
        id_user,
        idSchedule: id,
        client,
        procedure,
        date,
        time,
        price,
        phone: contact,
        pacote,
        qtdTotalAtendimento,
      });
      return { statusCode: 201 };
    } catch (error) {
      if (error.type === TYPE_ALREADY_EXISTS) {
        return { statusCode: 409 };
      }

      if (error.type === TYPE_INPUT_INVALIDS) {
        return { statusCode: 400 };
      }

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
