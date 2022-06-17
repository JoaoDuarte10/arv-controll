import { ClientEntity, IClientEntity } from '../../../domain/entities';
import { ILogger } from '../../../infrastructure/utils/logger';
import { CreateClient } from '../../../domain/usecases/client';
import { ClientRepository } from '../../../domain/repository';

export class CreateClientService implements CreateClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async create(params: IClientEntity): Promise<void> {
    const client = new ClientEntity(params);

    const findClient = { byEmail: null, byName: null };

    await Promise.all([
      this.clientRepository
        .findByEmail(params.id_user, params.email)
        .then((result) => (findClient.byEmail = result)),
      this.clientRepository
        .findByName(params.id_user, params.name)
        .then((result) => (findClient.byName = result)),
    ]);

    if (findClient.byEmail || findClient.byName) {
      throw {
        type: 'Client already exists',
        message: 'Client already exist',
      };
    }

    try {
      await this.clientRepository.create(client.props);
    } catch (error) {
      this.logger.error(
        `Error in CreateClientService in function create: ${error.message}`,
      );
    }
  }
}
