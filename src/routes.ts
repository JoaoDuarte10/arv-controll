import cors from 'cors';
import { Router } from "express";

import { scheduleController, salesController, loginController } from './useCases/index'

const router = Router();

router.use(cors());

router.post('/login', (req, res) => {
    return loginController.findLogin(req, res);
})

router.post('/new-sale', (req, res) => {
    return salesController.saveSales(req, res);
})

router.post('/sales-today', (req, res) => {
    return salesController.findSalesByDate(req, res);
})

router.post('/sales', (req, res) => {
    return salesController.findSalesByPeriod(req, res);
})

router.post('/schedule', (req, res) => {
    return scheduleController.findScheduleByDate(req, res);
})

router.post('/new-schedule', (req, res) => {
    return scheduleController.saveSchedule(req, res);
})

router.put('/update-schedule', (req, res) => {
    return scheduleController.updateSchedule(req, res);
})

router.delete('/delete-schedule', (req, res) => {
    return scheduleController.deleteSchedule(req, res);
})

export { router };