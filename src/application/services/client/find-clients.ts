import { FindClient } from '../../../domain/usecases/client';
import { ClientRepository } from '../../../domain/repository';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ClientModel } from '../../models';

export class FindClientService implements FindClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async find(id_user: number, id: number): Promise<ClientModel> {
    try {
      return await this.clientRepository.find(id_user, id);
    } catch (error) {
      this.logger.error(
        `Error in Find Client Service in function find: ${error.message}`,
      );
    }
  }

  async findAll(id_user: number): Promise<ClientModel[]> {
    try {
      return await this.clientRepository.findAll(id_user);
    } catch (error) {
      this.logger.error(
        `Error in Find Client Service in function findAll: ${error.message}`,
      );
    }
  }

  async findBySegment(
    id_user: number,
    segment: number,
  ): Promise<ClientModel[]> {
    try {
      return await this.clientRepository.findBySegment(id_user, segment);
    } catch (error) {
      this.logger.error(
        `Error in Find Client Service in function findBySegment: ${error.message}`,
      );
    }
  }
}
