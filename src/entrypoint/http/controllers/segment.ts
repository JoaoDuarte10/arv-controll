import { SegmentUseCase } from '@domain/usecases/segment';
import { Request, Response } from 'express';

class SegmentController {
  constructor(private segmentUseCase: SegmentUseCase) {}
  async findSegment(req: Request, res: Response): Promise<Response> {
    try {
      const segment = await this.segmentUseCase.findSegment();
      return res.status(200).json(segment);
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }
}

export { SegmentController };
