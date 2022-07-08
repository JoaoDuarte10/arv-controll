import { Controller } from '../../../contracts/controller';
import { FindClientService } from '../../../../application/services/client/find-clients';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Response } from '../../../contracts/response-request';
import { HttpRequest } from '../../../contracts/http';
import { ClientViewModel } from '../../../view-model';

import { Request } from 'express';

export class FindClientBySegmentController implements Controller {
  constructor(private readonly clientUseCase: FindClientService) {}

  async handle(
    req?: HttpRequest<Request>,
  ): Promise<HttpResponse<ClientViewModel[] | Response>> {
    const id_user = req.headers['id-user'] as string;
    const segment = req.query.segment as string;

    try {
      const result = await this.clientUseCase.findBySegment(id_user, segment);

      if (result.length === 0) {
        return { statusCode: 404 };
      }

      return {
        statusCode: 200,
        data: result,
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
