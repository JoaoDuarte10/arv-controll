export class ClientEntity {
  constructor(public props: IClientEntity) {}
}

export type IClientEntity = {
  id?: string;
  id_user: string;
  name: string;
  email: string;
  phone: string;
  segment?: string;
};
