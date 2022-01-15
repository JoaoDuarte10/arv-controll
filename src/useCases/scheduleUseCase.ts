import { ScheduleRepository, ISchedule } from '../repository/scheduleRepository';
import { logger } from '../utils/logger';

class ScheduleUseCase {
    constructor(
        private scheduleRepository: ScheduleRepository
    ) { }

    async findAllSchedules(id_user: string) {
        try {
            const findAll = await this.scheduleRepository.findAllSchedules(id_user);
            return findAll;
        } catch (error) {
            logger.error(`Error in ScheduleUseCase in function findAllSchedules: ${error.message}`)
        }
    }

    async findScheduleByDate(id_user: string, date: string): Promise<ISchedule[]> {
        try {
            const find = await this.scheduleRepository.findScheduleByDate(id_user, date);
            return find;
        } catch (error) {
            logger.error(`Error in ScheduleUseCase in function findScheduleByDate: ${error.message}`)
        }
    }

    async saveSchedule({ id_user, client, procedure, date, time, price, phone }: ISchedule): Promise<void> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleByTime(id_user, time)

        try {
            if (scheduleAlreadyExists.time) {
                throw {
                    type: 'Time already exists',
                    message: 'This time already exists'
                }
            }
            await this.scheduleRepository.saveSchedule({ id_user, client, procedure, date, time, price, phone })
        } catch (error) {
            logger.error(`Error in ScheduleUseCase in function saveSchedule: ${error.message}`)
        }
    }

    async updateSchedule({ id_user, id, client, procedure, date, time, price, phone }: ISchedule): Promise<ISchedule> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleById(id_user, id)

        try {
            if (!scheduleAlreadyExists) throw {
                type: 'Schedule already not exists',
                message: 'This time already not exists'
            }
            const update = await this.scheduleRepository.updateSchedule({ id_user, id, client, procedure, date, time, price, phone })
            return update
        } catch (error) {
            logger.error(`Error in ScheduleUseCase in function updateSchedule: ${error.message}`)
        }
    }

    async deleteSchedule(id_user: string, id: string): Promise<void> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleById(id_user, id);

        try {
            if (!scheduleAlreadyExists) throw {
                type: 'Schedule already not exists',
                message: 'Schedule already not exists'
            }
            const deleteSchedule = await this.scheduleRepository.deleteSchedule(id_user, id);
        } catch (error) {
            logger.error(`Error in ScheduleUseCase in function deleteSchedule: ${error.message}`)
        }
    }
}

export { ScheduleUseCase }