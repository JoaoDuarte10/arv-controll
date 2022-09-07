import { HttpRequest } from './http';

export interface Middleware {
  handle: (req: HttpRequest) => void;
}
