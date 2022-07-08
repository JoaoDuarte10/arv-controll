import { Controller } from '../../contracts';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req);
    if (httpResponse.data) {
      return res.status(httpResponse.statusCode).json(httpResponse.data);
    }
    res.status(httpResponse.statusCode).send();
  };
};
