import { Controller } from '../../../contracts/controller';
import { UpdateSchedule } from '../../../../domain/usecases/schedule/update-schedule';
import { HttpResponse } from 'src/entrypoint/contracts';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';

import { Request } from 'express';

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
