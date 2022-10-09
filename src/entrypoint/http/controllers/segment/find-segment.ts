import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { FindSegmentService } from '../../../../application/services/segment/find-segment';
import { Response } from '../../../contracts/response-request';
import { SegmentViewModel } from '../../../view-model';
import { HttpRequest } from '../../../contracts/http';

import { Request } from 'express';

export class FindSegmentController implements Controller {
  constructor(private readonly segmentService: FindSegmentService) {}
  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<SegmentViewModel[] | Response>> {
    const idusers = parseInt(req.headers['id-user'].toString(), 10);

    try {
      const result = await this.segmentService.execute(idusers);

      if (!result) {
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
