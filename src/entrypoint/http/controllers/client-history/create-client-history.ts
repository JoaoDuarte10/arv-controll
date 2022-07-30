import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { HttpRequest } from '../../../contracts/http';
import { Response } from '../../../contracts/response-request';
import { TYPE_INPUT_INVALIDS } from '../../../../application/utils/type-errors';
import { CreateClientHistory } from '../../../../domain/usecases/clients-history/create-client-history';

import { Request } from 'express';

export class CreateClientHistoryController implements Controller {
  constructor(private readonly createClientHistory: CreateClientHistory) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<void | Response>> {
    const { client, description, date } = req.body;
    const id_user = req.headers['id-user'] as string;

    try {
      await this.createClientHistory.execute({
        id_user,
        client,
        description,
        date,
      });

      return { statusCode: 201 };
    } catch (error) {
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
