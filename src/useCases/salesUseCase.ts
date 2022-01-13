import { SalesRepository, ISales } from '../repository/salesRepository';

class SalesUseCase {
    constructor(private salesRepository: SalesRepository) { }

    async saveSales({ id_user, description, date, price }: ISales): Promise<void> {
        await this.salesRepository.saveSales({ id_user, description, date, price })
    }

    async findSalesByDate(id_user: string, date: string): Promise<ISales[]> {
        const find = await this.salesRepository.findSaleByDate(id_user, date);
        return find;
    }

    async findSalesByPeriod(id_user: string, date1: string, date2: string): Promise<ISales[]> {
        const find = await this.salesRepository.findSaleByPeriod(id_user, date1, date2);
        return find;
    }
}

export { SalesUseCase }