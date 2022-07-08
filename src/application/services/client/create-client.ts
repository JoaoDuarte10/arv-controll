import { ClientEntity } from '../../../domain/entities';
import { ILogger } from '../../../infrastructure/utils/logger';
import { CreateClient } from '../../../domain/usecases/client';
import { ClientRepository } from '../../../domain/repository';
import { CreateClientInput } from '../../../domain/usecases/client/create-client';
import {
  TYPE_ALREADY_EXISTS,
  TYPE_INPUT_INVALIDS,
} from '../../utils/type-errors';

export class CreateClientService implements CreateClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: CreateClientInput): Promise<void> {
    const client = new ClientEntity(params);

    if (params.phone && !client.isValidPhone()) {
      throw {
        type: TYPE_INPUT_INVALIDS,
        message: 'Invalids parameters',
      };
    }

    const clientAlreadyExist: boolean = await this.isClientExist(
      params.id_user,
      params.name,
      params.email,
    );

    if (clientAlreadyExist) {
      throw {
        type: TYPE_ALREADY_EXISTS,
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

  private async isClientExist(
    id_user: string,
    name: string,
    email: string,
  ): Promise<boolean> {
    const findClient = { byEmail: null, byName: null };

    await Promise.all([
      this.clientRepository
        .findByEmail(id_user, email)
        .then((result) => (findClient.byEmail = result)),
      this.clientRepository
        .findByName(id_user, name)
        .then((result) => (findClient.byName = result)),
    ]);

    return findClient.byEmail || findClient.byName ? true : false;
  }
}
