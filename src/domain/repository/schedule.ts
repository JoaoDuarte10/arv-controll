interface ISchedule {
  id?: string;
  id_user: string;
  idSchedule?: string;
  client: string;
  procedure: string;
  date: string;
  time: string;
  price: string;
  phone?: string;
  isDefeated?: boolean;
  pacote?: boolean;
  qtdAtendimento?: number;
  qtdTotalAtendimento?: number;
}

interface ScheduleRepository {
  findByTime(id_user: string, time: string): Promise<ISchedule>;
  findById(id_user: string, id: string): Promise<ISchedule>;
  findAllExpireds(id_user: string): Promise<ISchedule[]>;
  findByDate(id_user: string, date: string): Promise<ISchedule[]>;
  save({
    id_user,
    client,
    procedure,
    date,
    time,
    price,
    phone,
    pacote,
    qtdTotalAtendimento,
  }: ISchedule): Promise<boolean>;
  update({
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
  }: ISchedule): Promise<ISchedule>;
  delete(id_user: string, id: string): Promise<boolean>;
}

export { ScheduleRepository, ISchedule };
