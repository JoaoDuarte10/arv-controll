interface ILogin {
  id?: string;
  user: string;
  password: string;
}

type LoginDb = {
  id?: string;
  user: string;
  password: string;
};

interface LoginRepository {
  find({ user, password }: ILogin): Promise<LoginDb>;
}

export { ILogin, LoginRepository };
