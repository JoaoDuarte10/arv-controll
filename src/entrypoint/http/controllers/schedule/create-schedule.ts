import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { CreateSchedule } from '../../../../domain/usecases/schedule/create-schedule';

import { Request } from 'express';

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
      price,
      contact,
      pacote,
      qtdTotalAtendimento,
    } = req.body;

    const id_user = req.headers.id_user as string;

    if (!client || !procedure || !date || !time || !price) {
      return {
        statusCode: 400,
        data: {
          type: 'error',
          message: 'invalids_inputs',
        },
      };
    }

    try {
      await this.scheduleService.execute({
        id_user,
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
