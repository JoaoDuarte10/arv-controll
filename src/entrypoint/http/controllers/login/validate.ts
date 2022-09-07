import { Controller } from '../../../contracts/controller';
import { ValidateLoginService } from '../../../../application/services/login/validate';
import { HttpRequest, HttpResponse } from '../../../contracts/http';
import { Request } from 'express';
import { Response } from '../../../contracts/response-request';
import { NotificationErrorException } from '../../../../domain/exceptions/notification-error-exception';

export class ValidateLoginController implements Controller {
  constructor(private readonly loginService: ValidateLoginService) {}

  async handle(
    req: HttpRequest<Request>,
  ): Promise<HttpResponse<string | Response>> {
    const { user, password } = req.body;

    try {
      const result = await this.loginService.execute({ user, password });
      return {
        statusCode: 200,
        data: result,
      };
    } catch (error) {
      if (error instanceof NotificationErrorException) {
        return {
          statusCode: 403,
          data: {
            type: 'error',
            message: error.message,
          },
        };
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
