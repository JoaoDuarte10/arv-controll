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

  async findSaleByDate(id_user: string, date: string): Promise<ISales[]> {
    const find = await Sales.find({ id_user: id_user, date: date }).sort({
      date: 1,
    });
    return find;
  }

  async findSaleByPeriod(
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

  async findSalesByClient(id_user: string, client: string): Promise<ISales[]> {
    const find = await Sales.find({ id_user: id_user, client: client }).sort({
      date: 1,
    });
    return find;
  }
}

export { SalesRepositoryMongoDB };
