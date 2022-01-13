interface ISchedule {
    id_user: string,
    id?: string,
    client: string,
    procedure: string,
    date: string,
    time: string,
    price: string,
    phone?: string
}

interface ScheduleRepository {
    findScheduleByTime(id_user: string, time: string): Promise<ISchedule>
    findScheduleById(id_user: string, id: string): Promise<ISchedule>
    findAllSchedules(id_user: string): Promise<ISchedule[]>
    findScheduleByDate(id_user: string, date: string): Promise<ISchedule[]>
    saveSchedule({ id_user, client, procedure, date, time, price, phone }: ISchedule): Promise<boolean>,
    updateSchedule({ id_user, id, client, procedure, date, time, price, phone }: ISchedule): Promise<ISchedule>,
    deleteSchedule(id_user, id: string): Promise<boolean>
}

export { ScheduleRepository, ISchedule }