import { ClientRepository } from '../../../domain/repository';
import { DeleteClient } from '../../../domain/usecases/client';
import { ILogger } from '../../../infrastructure/utils/logger';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';

export class DeleteClientService implements DeleteClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(idusers: number, idclients: number): Promise<void> {
    const findClient = await this.clientRepository.find(idusers, idclients);

    if (!findClient) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'Client does not exist',
      };
    }

    try {
      await this.clientRepository.delete(idusers, idclients);
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function deleteClient: ${error.message}`,
      );
    }
  }
}
