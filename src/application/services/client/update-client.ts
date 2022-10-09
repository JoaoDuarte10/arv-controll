import { ClientRepository } from '../../../domain/repository';
import { UpdateClient } from '../../../domain/usecases/client';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientEntity } from '../../../domain/entities/client';
import { ClientModel } from '../../models/client';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';

export class UpdateClientService implements UpdateClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}
  async execute(params: ClientModel): Promise<void> {
    const client = new ClientEntity(params);

    const findClient = await this.clientRepository.find(
      params.idusers,
      params.idsegments,
    );

    if (!findClient) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'Client does not exist',
      };
    }

    try {
      await this.clientRepository.update(client.returnProps());
    } catch (error) {
      this.logger.error(`Error in Update Client Service: ${error.message}`);
    }
  }
}
