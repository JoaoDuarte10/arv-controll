export interface ValidateLoginUseCase {
  execute: (login: Login) => Promise<string>;
}

export type Login = {
  id?: string;
  user: string;
  password: string;
};
