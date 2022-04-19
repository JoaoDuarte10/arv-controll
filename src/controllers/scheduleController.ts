import { Request, Response } from "express";
import { ScheduleUseCase } from '../useCases/scheduleUseCase';

class ScheduleController {
    constructor(
        private scheduleUseCase: ScheduleUseCase
    ) { }

    async findAllSchedules(req: Request, res: Response): Promise<Response> {
        const { id_user } = req.body;
        try {
            const schedules = await this.scheduleUseCase.findAllSchedules(id_user);
            return res.status(200).json(schedules.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)));
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async findScheduleByDate(req: Request, res: Response): Promise<Response> {
        const { id_user, date } = req.body

        try {
            const schedules = await this.scheduleUseCase.findScheduleByDate(id_user, date);
            return res.status(200).json(schedules.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)));
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async saveSchedule(req: Request, res: Response): Promise<Response> {
        const { id_user, client, procedure, date, time, price, contact, pacote, qtdTotalAtendimento } = req.body;


        if (contact.replace("_", "").toString().length < 16 && contact.replace("_", "").toString().length > 1) {
            return res.status(200).json({
                type: 'error',
                message: 'invalids_inputs'
            })
        }

        if (!client || !procedure || !date || !time || !price) {
            return res.status(200).json({
                type: 'error',
                message: 'invalids_inputs'
            })
        }

        try {
            await this.scheduleUseCase.saveSchedule({
                id_user: id_user,
                client: client,
                procedure: procedure,
                date: date,
                time: time,
                price: price,
                phone: contact,
                pacote: pacote,
                qtdTotalAtendimento: qtdTotalAtendimento
            })
            return res.status(200).json({
                type: 'success',
                message: 'Horário cadastrado com sucesso!'
            })
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async updateSchedule(req: Request, res: Response): Promise<Response> {
        const { id_user, id, client, procedure, date, time, price, contact, pacote, qtdTotalAtendimento } = req.body;

        if (contact.replace("_", "").toString().length < 16 && contact.replace("_", "").toString().length > 1) {
            return res.status(200).json({
                type: 'error',
                message: 'invalids_inputs'
            })
        }

        if (!client || !procedure || !date || !time || !price) {
            return res.status(200).json({
                type: 'error',
                message: 'invalids_inputs'
            })
        }
        try {
            await this.scheduleUseCase.updateSchedule({
                id_user: id_user,
                id: id,
                client: client,
                procedure: procedure,
                date: date,
                time: time,
                price: price,
                phone: contact,
                pacote, 
                qtdTotalAtendimento
            })
            return res.status(200).json({
                type: 'success',
                message: 'Horário atualizado com sucesso!'
            })
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async deleteSchedule(req: Request, res: Response): Promise<Response> {
        const { id_user, id } = req.query;

        try {
            await this.scheduleUseCase.deleteSchedule(id_user.toString(), id.toString())
            return res.status(200).json({
                type: 'success',
                message: 'Horário atualizado com sucesso!'
            })
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async finishSchedule(req: Request, res: Response): Promise<Response> {
        const { id_user, id } = req.query;

        try {
            await this.scheduleUseCase.finishSchedule(id_user.toString(), id.toString())
            return res.status(200).json({
                type: 'success',
                message: 'Horário finalizado com sucesso!'
            })
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }
}

export { ScheduleController }
