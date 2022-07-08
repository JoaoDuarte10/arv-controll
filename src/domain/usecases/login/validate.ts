export interface ValidateLoginUseCase {
  execute: (login: Login) => Promise<LoginOutput>;
}

export type Login = {
  id?: string;
  user: string;
  password: string;
};

export type LoginOutput = {
  id: string;
  user: string;
};
