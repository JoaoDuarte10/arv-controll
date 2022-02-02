import { ScheduleClientRepository, IScheduleClient } from '../repository/scheduleClientRepository';
import { logger } from '../utils/logger';

class ScheduleClientUseCase {
    constructor(private scheduleClientRepository: ScheduleClientRepository) { }

    async newScheduleClient({ id_user, name, date, time, service, phone }: IScheduleClient): Promise<void> {
        try {
            await this.scheduleClientRepository.newSchedule({ id_user, name, date, time, service, phone })
        } catch (error) {
            logger.error(`Error in ScheduleClientUseCase in function newScheduleClient: ${error.message}`)
        }
    }

    async findAllScheduleClients(id_user: string): Promise<IScheduleClient[]> {
        try {
            const findAll = await this.scheduleClientRepository.findAllScheduleClients(id_user);
            return findAll
        } catch (error) {
            logger.error(`Error in ScheduleClientUseCase in function findAllScheduleClients: ${error.message}`)
        }
    }

    async deleteScheduleClients(id_user: string, _id: string): Promise<void> {
        try {
            await this.scheduleClientRepository.deleteScheduleClients(id_user, _id);
        } catch (error) {
            logger.error(`Error in ScheduleClientUseCase in function deleteScheduleClients: ${error.message}`)
        }
    }
}

export { ScheduleClientUseCase }