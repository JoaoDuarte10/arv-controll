import { ScheduleRepository, ISchedule } from '../scheduleRepository';
import { Schedule } from '../../models/scheduleModels'

class ScheduleRepositoryMongoDB implements ScheduleRepository {
    async findScheduleByTime(id_user: string, time: string): Promise<any> {
        const find = await Schedule.find({ id_user: id_user, time: time })
        return find;
    }

    async findScheduleById(id_user: string, id: string): Promise<ISchedule> {
        const find = await Schedule.findOne({ id_user: id_user, _id: id });
        return find;
    }

    async findAllSchedules(id_user: string): Promise<ISchedule[]> {
        const find = await Schedule.find({ id_user: id_user });
        return find;
    }

    async findScheduleByDate(id_user: string, date: string): Promise<ISchedule[]> {
        const find = await Schedule.find({ id_user: id_user, date: date });
        return find;
    }

    async saveSchedule({ id_user, client, procedure, date, time, price, phone }: ISchedule): Promise<boolean> {
        const schedule = new Schedule({
            id_user: id_user,
            client: client,
            procedure: procedure,
            date: date,
            time: time,
            price: price,
            phone: phone
        });
        try {
            await schedule.save()
            return true
        } catch (err) {
            return false
        }
    }

    async updateSchedule({ id_user, id, client, procedure, date, time, price, phone }: ISchedule): Promise<ISchedule> {
        const findSchedule = await Schedule.findOne({ id_user: id_user, _id: id })

        try {
            const update = await findSchedule.updateOne({
                client: client,
                procedure: procedure,
                date: date,
                time: time,
                price: price,
                phone: phone
            })
            return update
        } catch (err) {
            return err.message
        }
    }

    async deleteSchedule(id_user: string, id: string): Promise<boolean> {
        const findSchedule = await Schedule.findOne({ id_user: id_user, _id: id });

        try {
            await findSchedule.deleteOne({ _id: id });
            return true
        } catch (err) {
            return false
        }
    }
}

export { ScheduleRepositoryMongoDB }