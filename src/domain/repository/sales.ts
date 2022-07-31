interface ISales {
  id_user: string;
  description: string;
  client: string;
  date: string;
  price: string;
}

interface SalesRepository {
  create({ id_user, description, client, date, price }: ISales): Promise<void>;
  findByDate(id_user: string, date: string): Promise<ISales[]>;
  findByPeriod(
    id_user: string,
    date1: string,
    date2: string,
  ): Promise<ISales[]>;
  findByClient(id_user: string, client: string): Promise<ISales[]>;
  findByAllFilters(
    id_user: string,
    client: string,
    date1: string,
    date2: string,
  ): Promise<ISales[]>;
}

export { ISales, SalesRepository };
