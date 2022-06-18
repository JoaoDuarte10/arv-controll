export interface ValidateLoginUseCase {
  execute: (login: Login) => Promise<LoginOutput>;
}

export type Login = {
  id?: string;
  name: string;
  password: string;
};

export type LoginOutput = {
  id: string;
  name: string;
};
