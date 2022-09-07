import { Middleware } from '../../contracts/middleware';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '../utils/http-status-code';

export const adapteMiddleware = (middleware: Middleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      middleware.handle(req);
      return next();
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send();
    }
  };
};
