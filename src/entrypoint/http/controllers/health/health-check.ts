import { HttpResponse } from 'src/entrypoint/contracts';
import { Controller } from '../../../contracts/controller';

export class HealthCheckController implements Controller {
  async handle(): Promise<HttpResponse<void>> {
    return { statusCode: 201 };
  }
}
