interface ILogin {
  id?: string;
  name: string;
  password: string;
}

interface LoginRepository {
  find({ name, password }: ILogin): Promise<ILogin>;
}

export { ILogin, LoginRepository };
