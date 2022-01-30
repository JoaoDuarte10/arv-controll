import { ClientRepository, IClient } from '../clientRepository';
import { Client } from '../../models/clientsModel'

class ClientRepositoryMongo implements ClientRepository {
    async newClient({ id_user, name, email, phone, segment }: IClient): Promise<void> {
        const client = new Client({
            id_user: id_user,
            name: name,
            email: email,
            phone: phone,
            segment: segment
        });
        await client.save();
    }

    async updateClient({ id_user, id, name, email, phone, segment }: IClient): Promise<IClient[]> {
        const findClient = await Client.findOne({ id_user: id_user, _id: id });
        const updateClient = await findClient.updateOne({
            id_user: id_user,
            name: name,
            email: email,
            phone: phone,
            segment: segment
        })
        return updateClient
    }

    async findAllClients(id_user: string): Promise<IClient[]> {
        const findAll = await Client.find({ id_user: id_user }).sort({ name: 1 });
        return findAll
    }

    async findClient(id_user: string, id: string): Promise<IClient> {
        const findClient = await Client.findOne({ id_user: id_user, _id: id })
        return findClient
    }

    async findByEmail(id_user: string, email: string): Promise<IClient> {
        const findByEmail = await Client.findOne({ id_user: id_user, email: email })
        return findByEmail
    }

    async findByName(id_user: string, name: string): Promise<IClient> {
        const findByName = await Client.findOne({ id_user: id_user, name: name })
        return findByName
    }

    async findBySegment(id_user: string, segment: string): Promise<IClient[]> {
        const findBySegment = await Client.find({ id_user: id_user, segment: segment});
        return findBySegment
    }

    async deleteClient(id_user: string, id: string): Promise<void> {
        const findClient = await Client.findOne({ id_user: id_user, _id: id });
        await findClient.delete()
    }
}

export { ClientRepositoryMongo }