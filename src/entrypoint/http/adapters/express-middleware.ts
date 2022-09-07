import { Middleware } from '../../contracts/middleware';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODE } from '../utils/http-status-code';
import { UnauthorizedException } from '../exceptions/Unauthorized';
import { InvalidTokenException } from '../exceptions/invalid-token';

export const adapteMiddleware = (middleware: Middleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      middleware.handle(req);
      return next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          type: 'unauthorized',
          message: 'Invalid credentials',
        });
      } else if (error instanceof InvalidTokenException) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
          type: 'unauthorized',
          message: 'Invalid token',
        });
      } else {
        return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
          type: 'serverError',
          message: 'Internal server error',
        });
      }
    }
  };
};
