import { ISales, SalesRepository } from '../../domain/repository';
import { Sales } from '../models';

class SalesRepositoryMongoDB implements SalesRepository {
  async create({
    id_user,
    description,
    client,
    price,
    date,
  }: ISales): Promise<void> {
    const sales = new Sales({
      id_user: id_user,
      description: description,
      client: client,
      price: price,
      date: date,
    });
    await sales.save();
  }

  async findByDate(id_user: string, date: string): Promise<ISales[]> {
    const find = await Sales.find({ id_user: id_user, date: date }).sort({
      date: 1,
    });
    return find.map((item) => {
      const { _id, id_user, __v, ...result } = item._doc;
      return Object.assign({}, result);
    });
  }

  async findByPeriod(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<ISales[]> {
    const find = await Sales.find({
      id_user: id_user,
      date: { $gte: date1, $lte: date2 },
    }).sort({ date: 1 });
    return find;
  }

  async findByClient(id_user: string, client: string): Promise<ISales[]> {
    const find = await Sales.find({ id_user: id_user, client: client }).sort({
      date: 1,
    });
    return find;
  }
}

export { SalesRepositoryMongoDB };
