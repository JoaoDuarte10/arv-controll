import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';
import { FindSegmentService } from '../../../../application/services/segment/find-segment';
import { Response } from '../../../contracts/response-request';
import { SegmentViewModel } from '../../../view-model';

export class FindSegmentController implements Controller {
  constructor(private readonly segmentService: FindSegmentService) {}
  async handle(): Promise<HttpResponse<SegmentViewModel[] | Response>> {
    try {
      const result = await this.segmentService.execute();
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
