import { Controller } from '../../../contracts/controller';
import { CreateSegment } from '../../../../domain/usecases/segment/create-segment';

import { HttpResponse } from 'src/entrypoint/contracts';
import { Response } from '../../../contracts/response-request';
import { Request } from 'express';
import { TYPE_ALREADY_EXISTS } from '../../../../application/utils/type-errors';
export class CreateSegmentController implements Controller {
  constructor(private readonly createSegmentService: CreateSegment) {}
  async handle(req: Request): Promise<HttpResponse<void | Response>> {
    const id_user = req.headers['id-user'] as string;
    const { segment } = req.body;

    try {
      await this.createSegmentService.execute({ id_user, segment });

      return { statusCode: 201 };
    } catch (error) {
      if (error.type === TYPE_ALREADY_EXISTS) {
        return { statusCode: 409 };
      }

      return {
        statusCode: 500,
        data: error.message,
      };
    }
  }
}
