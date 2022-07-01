import {
  IScheduleClient,
  ScheduleClientRepository,
} from '../../domain/repository';
import { ScheduleClient } from '../models';

class ScheduleClientRepositoryMongo implements ScheduleClientRepository {
  async newSchedule({
    id_user,
    name,
    date,
    time,
    service,
    phone,
  }: IScheduleClient): Promise<void> {
    const schedule = new ScheduleClient({
      id_user: id_user,
      name: name,
      service: service,
      date: date,
      time: time,
      phone: phone,
    });
    await schedule.save();
  }

  async findAllScheduleClients(id_user: string): Promise<IScheduleClient[]> {
    const findAll = await ScheduleClient.find({ id_user: id_user });
    return findAll as any;
  }

  async deleteScheduleClients(id_user: string, _id: string): Promise<void> {
    await ScheduleClient.deleteOne({ id_user: id_user, _id: _id });
  }
}

export { ScheduleClientRepositoryMongo };
