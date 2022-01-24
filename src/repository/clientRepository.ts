interface IClient {
    id?: string,
    id_user: string,
    name: string,
    email: string,
    phone: string
};

interface ClientRepository {
    newClient({ id_user, name, email, phone }: IClient): Promise<void>
    updateClient({ id_user, id, name, email, phone }: IClient): Promise<IClient[]>
    findAllClients(id_user: string): Promise<IClient[]>
    findClient(id_user: string, id: string): Promise<IClient>
    findByEmail(id_user: string, email: string): Promise<IClient>
    deleteClient(id_user: string, id: string): Promise<void>
}

export { IClient, ClientRepository }