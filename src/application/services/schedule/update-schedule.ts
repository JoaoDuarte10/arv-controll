import { ScheduleRepository } from 'src/domain/repository';
import { UpdateScheduleModel } from '../../models/schedule';
import { ScheduleEntity } from '../../../domain/entities/schedule';
import { ILogger } from '../../../infrastructure/utils/logger';
import { UpdateSchedule } from '../../../domain/usecases/schedule/update-schedule';
import { TYPE_NOT_EXISTS, TYPE_INPUT_INVALIDS } from '../../utils/type-errors';

export class UpdateScheduleService implements UpdateSchedule {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: UpdateScheduleModel): Promise<void> {
    const schedule = new ScheduleEntity(params);

    const scheduleAlreadyExists = await this.scheduleRepository.findById(
      params.id_user,
      params.idSchedule,
    );

    if (!scheduleAlreadyExists) {
      throw {
        type: TYPE_NOT_EXISTS,
        message: 'This schedule not exists',
      };
    }

    if (params.phone && !schedule.isValidPhone()) {
      throw {
        type: TYPE_INPUT_INVALIDS,
        message: 'Invalids parameters',
      };
    }

    schedule.isNotPacoteRemoveCalls();

    try {
      await this.scheduleRepository.update(schedule.returnProps());
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function saveSchedule: ${error.message}`,
      );
    }
  }
}
