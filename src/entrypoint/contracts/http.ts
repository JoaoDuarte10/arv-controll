/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpRequest<T = any> = T;

export type HttpResponse<T = any> = {
  statusCode: number;
  data?: T;
};
