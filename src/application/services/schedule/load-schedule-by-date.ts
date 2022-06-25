import { LoadSchedulesByDate } from '../../../domain/usecases/schedule/load-schedule-by-date';
import { ILogger } from '../../../infrastructure/utils/logger';
import { ScheduleRepository } from 'src/domain/repository';

import moment from 'moment';
import { ScheduleOutput } from '../../models/schedule';

export class LoadScheduleByDateService implements LoadSchedulesByDate {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(params: {
    id_user: string;
    date: string;
  }): Promise<ScheduleOutput[]> {
    try {
      const actualDate = moment(new Date()).format('YYYY-MM-DD');

      const findScheduleByDate = await this.scheduleRepository.findByDate(
        params.id_user,
        params.date,
      );

      const result = findScheduleByDate
        .map((item) => {
          if (item.date < actualDate) {
            return {
              _id: item._id,
              id_user: item.id_user,
              client: item.client,
              procedure: item.procedure,
              date: item.date,
              time: item.time,
              price: item.price,
              phone: item.phone,
              isDefeated: true,
            };
          }
          return item;
        })
        .filter((item) => item.date === params.date);

      return result;
    } catch (error) {
      this.logger.error(
        `Error in ScheduleUseCase in function findScheduleByDate: ${error.message}`,
      );
    }
  }
}
