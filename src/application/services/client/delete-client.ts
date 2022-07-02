import { ClientRepository } from '../../../domain/repository';
import { DeleteClient } from '../../../domain/usecases/client';
import { ILogger } from '../../../infrastructure/utils/logger';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';

export class DeleteClientService implements DeleteClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id_user: string, id: string): Promise<void> {
    const findClient = await this.clientRepository.find(id_user, id);

    if (!findClient) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'Client does not exist',
      };
    }

    try {
      await this.clientRepository.delete(id_user, id);
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function deleteClient: ${error.message}`,
      );
    }
  }
}
