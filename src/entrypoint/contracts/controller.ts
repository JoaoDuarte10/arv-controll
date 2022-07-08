import { HttpResponse } from '../contracts/http';
import { HttpRequest } from './http';

export interface Controller {
  handle: (req?: HttpRequest) => Promise<HttpResponse>;
}
