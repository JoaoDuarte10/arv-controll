import { ScheduleRepository, ISchedule } from '../scheduleRepository';
import { Schedule } from '../../models/scheduleModels';

class ScheduleRepositoryMongoDB implements ScheduleRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findScheduleByTime(id_user: string, time: string): Promise<any> {
    const find = await Schedule.find({ id_user: id_user, time: time });
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

  async findScheduleByDate(
    id_user: string,
    date: string,
  ): Promise<ISchedule[]> {
    const find = await Schedule.find({ id_user: id_user, date: date });
    return find;
  }

  async findScheduleWhereDateLassThen(
    id_user: string,
    date: string,
  ): Promise<ISchedule[]> {
    const find = await Schedule.find({
      id_user: id_user,
      date: { $lte: date },
    });
    return find.map((item) => ({
      _id: item._id,
      id_user: item.id_user,
      client: item.client,
      procedure: item.procedure,
      date: item.date,
      time: item.time,
      price: item.price,
      phone: item.phone,
      isDefeated: true,
    }));
  }

  async saveSchedule({
    id_user,
    client,
    procedure,
    date,
    time,
    price,
    phone,
    pacote,
    qtdTotalAtendimento,
  }: ISchedule): Promise<boolean> {
    const schedule = new Schedule({
      id_user: id_user,
      client: client,
      procedure: procedure,
      date: date,
      time: time,
      price: price,
      phone: phone,
      pacote: pacote,
      qtdTotalAtendimento: qtdTotalAtendimento,
      qtdAtendimento: 0,
    });
    try {
      await schedule.save();
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateSchedule({
    id_user,
    id,
    client,
    procedure,
    date,
    time,
    price,
    phone,
    pacote,
    qtdTotalAtendimento,
    qtdAtendimento,
  }: ISchedule): Promise<ISchedule> {
    const findSchedule = await Schedule.findOne({ id_user: id_user, _id: id });

    try {
      const update = await findSchedule.updateOne({
        client: client,
        procedure: procedure,
        date: date,
        time: time,
        price: price,
        phone: phone,
        pacote: pacote,
        qtdTotalAtendimento: qtdTotalAtendimento,
        qtdAtendimento: qtdAtendimento,
      });
      return update;
    } catch (err) {
      return err.message;
    }
  }

  async deleteSchedule(id_user: string, id: string): Promise<boolean> {
    const findSchedule = await Schedule.findOne({ id_user: id_user, _id: id });

    try {
      await findSchedule.deleteOne({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }
}

export { ScheduleRepositoryMongoDB };
