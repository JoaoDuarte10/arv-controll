import { FindClient } from '../../../domain/usecases/client';
import { ClientRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientModel } from '../../models';

export class FindClientService implements FindClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async find(id_user: string, id: string): Promise<ClientModel> {
    try {
      const findClient = await this.clientRepository.find(id_user, id);
      return findClient;
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function findClient: ${error.message}`,
      );
    }
  }

  async findAll(id_user: string): Promise<ClientModel[]> {
    try {
      return await this.clientRepository.findAll(id_user);
    } catch (error) {
      this.logger.error(
        `Error in ClientUseCase in function findAllClients: ${error.message}`,
      );
    }
  }

  async findBySegment(
    id_user: string,
    segment: string,
  ): Promise<ClientModel[]> {
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
}
