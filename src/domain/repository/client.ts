type IClient = {
  idclients?: number;
  idusers?: number;
  idsegments?: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
};

interface ClientRepository {
  create({ idusers, name, email, phone, idsegments }: IClient): Promise<void>;
  update({
    idusers,
    idclients,
    name,
    email,
    phone,
    idsegments,
  }: IClient): Promise<void>;
  findAll(idusers: number): Promise<IClient[]>;
  find(idusers: number, idclients: number): Promise<IClient>;
  findByEmail(idusers: number, email: string): Promise<IClient>;
  findByName(idusers: number, name: string): Promise<IClient>;
  findBySegment(idusers: number, idsegments: number): Promise<IClient[]>;
  delete(idusers: number, idclients: number): Promise<void>;
}

export { IClient, ClientRepository };
