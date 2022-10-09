export interface ValidateLoginUseCase {
  execute: (login: Login) => Promise<LoginOutput>;
}

export type Login = {
  idusers?: number;
  user: string;
  password: string;
  phone: string;
};

export type LoginOutput = {
  token: string;
  refreshToken: string;
};
