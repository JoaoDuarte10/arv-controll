import { DeleteSchedule } from '../../../domain/usecases/schedule/delete-schedule';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleRepository } from 'src/domain/repository';
import { TYPE_NOT_EXISTS } from '../../utils/type-errors';

export class DeleteScheduleService implements DeleteSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}
  async execute(params: { id_user: string; id: string }): Promise<void> {
    const scheduleAlreadyExists = await this.scheduleRepository.findById(
      params.id_user,
      params.id,
    );
    if (!scheduleAlreadyExists) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'Schedule already not exists',
      };
    }
    try {
      await this.scheduleRepository.delete(params.id_user, params.id);
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function deleteSchedule: ${error.message}`,
      );
    }
  }
}
