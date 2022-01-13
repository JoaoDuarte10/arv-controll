import { SalesRepository, ISales } from '../salesRepository';
import { Sales } from '../../models/salesModels'

class SalesRepositoryMongoDB implements SalesRepository {
    async saveSales({ id_user, description, price, date }: ISales): Promise<void> {
        const sales = new Sales({
            id_user: id_user,
            description: description,
            price: price,
            date: date
        });
        await sales.save()
    }

    async findSaleByDate(id_user: string, date: string): Promise<ISales[]> {
        const find = await Sales.find({ id_user: id_user, date: date }).sort({ date: 1 })
        return find;
    }

    async findSaleByPeriod(id_user: string, date1: string, date2: string): Promise<ISales[]> {
        const find = await Sales.find({ id_user: id_user, date: { $gte: date1, $lte: date2 } }).sort({ date: 1 });
        return find;
    }
}

export { SalesRepositoryMongoDB }