interface ILogin {
  idusers?: number;
  name: string;
  password: string;
  phone: string;
}

export type LoginDb = {
  idusers?: number;
  name: string;
  password: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

interface LoginRepository {
  find(name: string, password: string): Promise<LoginDb>;
}

export { ILogin, LoginRepository };
