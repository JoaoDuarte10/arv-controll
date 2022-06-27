import { ISchedule, ScheduleRepository } from '../../domain/repository';
import { Schedule } from '../models';

class ScheduleRepositoryMongoDB implements ScheduleRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findByTime(id_user: string, time: string): Promise<any> {
    const find = await Schedule.find({ id_user: id_user, time: time });
    return find.map((item) => {
      const { _id, ...result } = item;
      return Object.assign({}, result, { id: _id });
    });
  }

  async findById(id_user: string, id: string): Promise<ISchedule> {
    const find = await Schedule.findOne({ id_user: id_user, _id: id });
    const { _id, ...result } = find._doc || find;
    return Object.assign({}, result, { id: _id });
  }

  async findAll(id_user: string): Promise<ISchedule[]> {
    const find = await Schedule.find({ id_user: id_user });
    return find;
  }

  async findByDate(id_user: string, date: string): Promise<ISchedule[]> {
    const find = await Schedule.find({
      id_user: id_user,
      date: { $lte: date },
    });

    return find.map((item) => {
      const { _id, ...result } = item._doc;
      return Object.assign({}, result, { id: _id });
    });
  }

  async save({
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

  async update({
    id_user,
    idSchedule,
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
    const findSchedule = await Schedule.findOne({
      id_user: id_user,
      _id: idSchedule,
    });

    try {
      await findSchedule.updateOne({
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdTotalAtendimento,
        qtdAtendimento,
      });
    } catch (err) {
      return err.message;
    }
  }

  async delete(id_user: string, id: string): Promise<boolean> {
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
