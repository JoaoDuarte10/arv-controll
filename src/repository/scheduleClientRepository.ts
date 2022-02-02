interface IScheduleClient {
    id_user: string
    name: string;
    date: string;
    time: string;
    service: string;
    phone: string;
    createdAt?: Date;
}

interface ScheduleClientRepository {
    newSchedule({ id_user, name, date, time, service, phone }: IScheduleClient): Promise<void>
    findAllScheduleClients(id_user: string): Promise<IScheduleClient[]>
    deleteScheduleClients(id_user: string, _id: string): Promise<void>
}

export { IScheduleClient, ScheduleClientRepository }