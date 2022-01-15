import cors from 'cors';
import { Router } from "express";

import { scheduleController, salesController, loginController } from './useCases/index'

const router = Router();

router.use(cors());

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use((req, res, next) => {
    res.status(404).send('<h1>Página não encontrada :(</h1>')
})

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