import { ScheduleClientUseCase } from '@domain/usecases/schedule-client';
import { Request, Response } from 'express';

class ScheduleClientController {
  constructor(private scheduleClientUseCase: ScheduleClientUseCase) {}

  async findAllScheduleClients(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.body;
    try {
      const schedules = await this.scheduleClientUseCase.findAllScheduleClients(
        id_user,
      );
      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async saveScheduleClients(req: Request, res: Response): Promise<Response> {
    const { id_user, name, service, date, time, phone } = req.body;

    if (
      phone.replace('_', '').toString().length < 16 &&
      phone.replace('_', '').toString().length > 1
    ) {
      return res.status(200).json({
        type: 'error',
        message: 'invalids_inputs',
      });
    }

    try {
      await this.scheduleClientUseCase.newScheduleClient({
        id_user: id_user,
        name: name,
        service: service,
        date: date,
        time: time,
        phone: phone,
      });
      return res.status(200).json({
        type: 'success',
        message: 'Horário agendado com sucesso!',
      });
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }

  async deleteSchedule(req: Request, res: Response): Promise<Response> {
    const { id_user, id } = req.query;

    try {
      await this.scheduleClientUseCase.deleteScheduleClients(
        id_user.toString(),
        id.toString(),
      );
      return res.status(200).json({
        type: 'success',
        message: 'Horário deletado com sucesso!',
      });
    } catch (error) {
      return res.status(200).json({
        type: 'error',
        message: error.message,
      });
    }
  }
}

export { ScheduleClientController };
