import { ClientRepository } from '../../../domain/repository';
import { UpdateClient } from '../../../domain/usecases/client';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientEntity } from '../../../domain/entities/client';
import { UpdateClientInput } from '../../../domain/usecases/client/update-client';

export class UpdateClientService implements UpdateClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}
  async execute(params: UpdateClientInput): Promise<void> {
    const client = new ClientEntity(params);

    const findClient = await this.clientRepository.find(
      params.id_user,
      params.id,
    );
    if (!findClient) {
      throw {
        type: 'Client already not exists',
        message: 'Client does not exist',
      };
    }

    try {
      await this.clientRepository.update(client.props);
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function updateClient: ${error.message}`,
      );
    }
  }
}
