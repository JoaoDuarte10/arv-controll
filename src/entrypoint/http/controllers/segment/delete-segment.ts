import { Controller } from '../../../contracts/controller';
import { DeleteSegment } from '../../../../domain/usecases/segment/delete-segment';
import { HttpResponse } from 'src/entrypoint/contracts';
import { Request } from 'express';
import { Response } from '../../../contracts/response-request';
import { TYPE_ALREADY_EXISTS } from '../../../../application/utils/type-errors';

export class DeleteSegmentController implements Controller {
  constructor(private readonly deleteSegmentService: DeleteSegment) {}

  async handle(req: Request): Promise<HttpResponse<void | Response>> {
    const id = req.query.id as string;
    const segment = req.query.segment as string;
    const id_user = req.headers['id-user'] as string;

    try {
      await this.deleteSegmentService.execute({ segment, id, id_user });
      return { statusCode: 204 };
    } catch (error) {
      if (error.type === TYPE_ALREADY_EXISTS) {
        return { statusCode: 409 };
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
