import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { CreateSchedule } from '../../../../domain/usecases/schedule/create-schedule';

import { Request } from 'express';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../../../application/utils/type-errors';

export class CreateScheduleController implements Controller {
  constructor(private readonly scheduleService: CreateSchedule) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const {
      client,
      procedure,
      date,
      time,
      contact,
      pacote,
      qtdTotalAtendimento,
    } = req.body;

    const id_user = req.headers['id-user'] as string;

    if (!client || !procedure || !date || !time) {
      return { statusCode: 400 };
    }

    try {
      await this.scheduleService.execute({
        id_user,
        client,
        procedure,
        date,
        time,
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
        data: error.message,
      };
    }
  }
}
