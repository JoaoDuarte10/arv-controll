import { ISchedule, ScheduleRepository } from '../../domain/repository';
import { Schedule } from '../models';
import moment from 'moment';

class ScheduleRepositoryMongoDB implements ScheduleRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findByTime(id_user: string, time: string): Promise<any> {
    const find = await Schedule.find({ id_user: id_user, time: time });

    return find.map((item) => {
      const {
        _id,
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdAtendimento,
        qtdTotalAtendimento,
      } = item;
      return Object.assign(
        {},
        {
          id: _id._id as any,
          id_user,
          client,
          procedure,
          date,
          time,
          price,
          phone,
          pacote,
          qtdAtendimento,
          qtdTotalAtendimento,
        },
      );
    });
  }

  async findById(idUser: string, id: string): Promise<ISchedule> {
    const find = await Schedule.findOne({ id_user: idUser, _id: id });

    const {
      _id,
      id_user,
      client,
      procedure,
      date,
      time,
      price,
      phone,
      pacote,
      qtdAtendimento,
      qtdTotalAtendimento,
    } = find;
    return Object.assign(
      {},
      {
        id: _id._id as any,
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdAtendimento,
        qtdTotalAtendimento,
      },
    );
  }

  async findAllExpireds(id_user: string): Promise<ISchedule[]> {
    const date = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
    const find = await Schedule.find({
      id_user: id_user,
      date: { $lte: date },
    }).sort({ date: -1 });

    if (!find) return;

    return find.map((item) => {
      const {
        _id,
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdAtendimento,
        qtdTotalAtendimento,
      } = item;
      return Object.assign(
        {},
        {
          id: _id._id as any,
          id_user,
          client,
          procedure,
          date,
          time,
          price,
          phone,
          pacote,
          qtdAtendimento,
          qtdTotalAtendimento,
        },
      );
    });
  }

  async findByDate(id_user: string, date: string): Promise<ISchedule[]> {
    const find = await Schedule.find({
      id_user: id_user,
      date,
    });

    return find.map((item) => {
      const {
        _id,
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdAtendimento,
        qtdTotalAtendimento,
      } = item;
      return Object.assign(
        {},
        {
          id: _id._id as any,
          id_user,
          client,
          procedure,
          date,
          time,
          price,
          phone,
          pacote,
          qtdAtendimento,
          qtdTotalAtendimento,
        },
      );
    });
  }

  async findByClient(id_user: string, client: string): Promise<ISchedule[]> {
    const find = await Schedule.find({
      id_user: id_user,
      client,
    });

    return find.map((item) => {
      const {
        _id,
        id_user,
        client,
        procedure,
        date,
        time,
        price,
        phone,
        pacote,
        qtdAtendimento,
        qtdTotalAtendimento,
      } = item;
      return Object.assign(
        {},
        {
          id: _id._id as any,
          id_user,
          client,
          procedure,
          date,
          time,
          price,
          phone,
          pacote,
          qtdAtendimento,
          qtdTotalAtendimento,
        },
      );
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
