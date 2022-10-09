import { Login, LoginOutput } from '../../domain/usecases/login/validate';

export type LoginModel = {
  idusers?: number;
  user: string;
  password?: string;
  phone?: string;
};

export type LoginOutputModel = LoginOutput;
