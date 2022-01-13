import { ScheduleRepository, ISchedule } from '../repository/scheduleRepository'

class ScheduleUseCase {
    constructor(
        private scheduleRepository: ScheduleRepository
    ) { }

    async findAllSchedules(id_user: string) {
        const findAll = await this.scheduleRepository.findAllSchedules(id_user);
        return findAll;
    }

    async findScheduleByDate(id_user: string, date: string): Promise<ISchedule[]> {
        const find = await this.scheduleRepository.findScheduleByDate(id_user, date);
        return find;
    }

    async saveSchedule({ id_user, client, procedure, date, time, price, phone }: ISchedule): Promise<void> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleByTime(id_user, time)

        if (scheduleAlreadyExists.time) {
            throw {
                type: 'Time already exists',
                message: 'This time already exists'
            }
        }
        await this.scheduleRepository.saveSchedule({ id_user, client, procedure, date, time, price, phone })
    }

    async updateSchedule({ id_user, id, client, procedure, date, time, price, phone }: ISchedule): Promise<ISchedule> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleById(id_user, id)

        if (!scheduleAlreadyExists) throw {
            type: 'Schedule already not exists',
            message: 'This time already not exists'
        }

        const update = await this.scheduleRepository.updateSchedule({ id_user, id, client, procedure, date, time, price, phone })
        return update
    }

    async deleteSchedule(id_user: string, id: string): Promise<void> {
        const scheduleAlreadyExists = await this.scheduleRepository.findScheduleById(id_user, id);

        if (!scheduleAlreadyExists) throw {
            type: 'Schedule already not exists',
            message: 'Schedule already not exists'
        }

        const deleteSchedule = await this.scheduleRepository.deleteSchedule(id_user, id);
    }
}

export { ScheduleUseCase }