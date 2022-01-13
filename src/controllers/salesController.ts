import { Request, Response } from 'express';
import { SalesUseCase } from '../useCases/salesUseCase'

class SalesController {
    constructor(private salesUseCase: SalesUseCase) { }

    async saveSales(req: Request, res: Response): Promise<Response> {
        const { id_user, description, price, date } = req.body;

        const params = [id_user, description, price, date].filter(item => !!item);

        if (params.length < 3) {
            res.status(200).json({
                type: 'inputs_invalids',
                message: 'Invalids parameters'
            })
        }

        try {
            await this.salesUseCase.saveSales({ id_user, description, date, price })
            return res.status(200).json({
                type: 'success',
                message: 'Sale registry success!'
            });
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async findSalesByDate(req: Request, res: Response): Promise<Response> {
        const { id_user, date } = req.body;

        if (!date) {
            res.status(200).json({
                type: "inputs_invalids",
                message: "Invalid date"
            })
        }

        try {
            const find = await this.salesUseCase.findSalesByDate(id_user, date)
            return res.status(200).json(find);
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }

    async findSalesByPeriod(req: Request, res: Response): Promise<Response> {
        const { id_user, date1, date2 } = req.body;

        if (!date1 && !date2 || date1 === '') {
            return res.status(200).json({
                type: "inputs_invalids",
                message: "Invalid date"
            })
        }

        try {
            if (date1 && date2) {
                const findDates = await this.salesUseCase.findSalesByPeriod(id_user, date1, date2)
                return res.status(200).json(findDates);
            }
            if (date1 && !date2) {
                const findDate = await this.salesUseCase.findSalesByDate(id_user, date1)
                return res.status(200).json(findDate);
            }
        } catch (error) {
            return res.status(200).json({
                type: 'error',
                message: error.message
            })
        }
    }
}

export { SalesController }