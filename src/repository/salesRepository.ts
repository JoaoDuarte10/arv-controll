interface ISales {
    id_user: string,
    description: string,
    client: string,
    date: string,
    price: string
};

interface SalesRepository {
    saveSales({ id_user, description, client, date, price }: ISales): Promise<void>
    findSaleByDate(id_user: string, date: string): Promise<ISales[]>
    findSaleByPeriod(id_user: string, date1: string, date2: string): Promise<ISales[]>
    findSalesByClient(id_user: string, client: string): Promise<ISales[]>
}

export { ISales, SalesRepository }