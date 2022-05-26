import { ClientRepository, IClient } from '../repository/clientRepository';
import { ILogger } from '../utils/logger';

class ClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async newClient({
    id_user,
    name,
    email,
    phone,
    segment,
  }: IClient): Promise<void> {
    if (email) {
      const findClient = await this.clientRepository.findByEmail(
        id_user,
        email,
      );

      if (findClient) {
        throw {
          type: 'Client already exists',
          message: 'Client already exist',
        };
      }
    }

    const findClientByName = await this.clientRepository.findByName(
      id_user,
      name,
    );
    if (findClientByName) {
      throw {
        type: 'Client already exists',
        message: 'This client already exist.',
      };
    }

    try {
      await this.clientRepository.newClient({
        id_user,
        name,
        email,
        phone,
        segment,
      });
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function newClient: ${error.message}`,
      );
    }
  }

  async updateClient({
    id_user,
    id,
    name,
    email,
    phone,
    segment,
  }: IClient): Promise<IClient[]> {
    const findClient = await this.clientRepository.findClient(id_user, id);
    if (!findClient) {
      throw {
        type: 'Client already not exists',
        message: 'Client does not exist',
      };
    }

    try {
      const updateClient = await this.clientRepository.updateClient({
        id_user,
        id,
        name,
        email,
        phone,
        segment,
      });
      return updateClient;
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function updateClient: ${error.message}`,
      );
    }
  }

  async findAllClients(id_user: string): Promise<IClient[]> {
    try {
      const allClients = await this.clientRepository.findAllClients(id_user);
      return allClients;
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function findAllClients: ${error.message}`,
      );
    }
  }

  async findClient(id_user: string, id: string): Promise<IClient> {
    try {
      const findClient = await this.clientRepository.findClient(id_user, id);
      return findClient;
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function findClient: ${error.message}`,
      );
    }
  }

  async findBySegment(id_user: string, segment: string): Promise<IClient[]> {
    try {
      const findClients = await this.clientRepository.findBySegment(
        id_user,
        segment,
      );
      return findClients;
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function findBySegment: ${error.message}`,
      );
    }
  }

  async deleteClient(id_user: string, id: string): Promise<void> {
    const findClient = await this.clientRepository.findClient(id_user, id);

    if (!findClient) {
      throw {
        type: 'Client already not exists',
        message: 'Client does not exist',
      };
    }

    try {
      await this.clientRepository.deleteClient(id_user, id);
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function deleteClient: ${error.message}`,
      );
    }
  }
}

export { ClientUseCase };
