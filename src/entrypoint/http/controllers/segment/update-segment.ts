import { Controller } from '../../../contracts/controller';
import { UpdateSegmentService } from '../../../../application/services/segment/update-segment';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Response } from '../../../contracts/response-request';
import { Request } from 'express';

export class UpdateSegmentController implements Controller {
  constructor(private readonly updateSegmentService: UpdateSegmentService) {}

  async handle(req: Request): Promise<HttpResponse<void | Response>> {
    const id_user = req.headers['id-user'] as string;
    const { id, segment } = req.body;

    try {
      await this.updateSegmentService.execute({ id, id_user, segment });
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
