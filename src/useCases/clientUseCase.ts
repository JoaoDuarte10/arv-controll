import { ClientRepository, IClient } from '../repository/clientRepository';
import { logger } from '../utils/logger';

class ClientUseCase {
    constructor(private clientRepository: ClientRepository) { }

    async newClient({ id_user, name, email, phone }: IClient): Promise<void> {
        try {
            const findClient = await this.clientRepository.findByEmail(id_user, email);

            if (findClient) throw {
                type: "Client already exists",
                message: "Client does exist"
            }
            await this.clientRepository.newClient({ id_user, name, email, phone })

        } catch (error) {
            logger.error(`Error in ClientUseCase in function newClient: ${error.message}`)
        }
    }

    async updateClient({ id_user, id, name, email, phone }: IClient): Promise<IClient[]> {
        try {
            const findClient = await this.clientRepository.findClient(id_user, id)
            if (!findClient) throw {
                type: "Client already not exists",
                message: "Client does not exist"
            }

            const updateClient = await this.clientRepository.updateClient({ id_user, id, name, email, phone })
            return updateClient

        } catch (error) {
            logger.error(`Error in ClientUseCase in function updateClient: ${error.message}`)
        }
    }

    async findAllClients(id_user: string): Promise<IClient[]> {
        try {
            const allClients = await this.clientRepository.findAllClients(id_user);
            return allClients

        } catch (error) {
            logger.error(`Error in ClientUseCase in function findAllClients: ${error.message}`)
        }
    }

    async findClient(id_user: string, id: string): Promise<IClient> {
        try {
            const findClient = await this.clientRepository.findClient(id_user, id)
            return findClient

        } catch (error) {
            logger.error(`Error in ClientUseCase in function findClient: ${error.message}`)
        }
    }

    async deleteClient(id_user: string, id: string): Promise<void> {
        try {
            const findClient = await this.clientRepository.findClient(id_user, id)

            if (!findClient) throw {
                type: "Client already not exists",
                message: "Client does not exist"
            }
            const deleteClient = await this.clientRepository.deleteClient(id_user, id)

        } catch (error) {
            logger.error(`Error in ClientUseCase in function deleteClient: ${error.message}`)
        }
    }

}

export { ClientUseCase }