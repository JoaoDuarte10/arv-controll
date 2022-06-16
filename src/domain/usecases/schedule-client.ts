import { ILogger } from '@infrastructure/utils/logger';
import { ScheduleClientRepository, IScheduleClient } from '@domain/repository';

class ScheduleClientUseCase {
  constructor(
    private scheduleClientRepository: ScheduleClientRepository,
    private readonly logger: ILogger,
  ) {}

  async newScheduleClient({
    id_user,
    name,
    date,
    time,
    service,
    phone,
  }: IScheduleClient): Promise<void> {
    try {
      await this.scheduleClientRepository.newSchedule({
        id_user,
        name,
        date,
        time,
        service,
        phone,
      });
    } catch (error) {
      this.logger.error(
        `Error in ScheduleClientUseCase in function newScheduleClient: ${error.message}`,
      );
    }
  }

  async findAllScheduleClients(id_user: string): Promise<IScheduleClient[]> {
    try {
      const findAll =
        await this.scheduleClientRepository.findAllScheduleClients(id_user);
      return findAll;
    } catch (error) {
      this.logger.error(
        `Error in ScheduleClientUseCase in function findAllScheduleClients: ${error.message}`,
      );
    }
  }

  async deleteScheduleClients(id_user: string, _id: string): Promise<void> {
    try {
      await this.scheduleClientRepository.deleteScheduleClients(id_user, _id);
    } catch (error) {
      this.logger.error(
        `Error in ScheduleClientUseCase in function deleteScheduleClients: ${error.message}`,
      );
    }
  }
}

export { ScheduleClientUseCase };
