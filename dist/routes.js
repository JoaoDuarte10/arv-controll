"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const index_1 = require("./useCases/index");
const router = (0, express_1.Router)();
exports.router = router;
router.use((0, cors_1.default)());
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use((req, res, next) => {
    res.status(404).send('<h1>Página não encontrada :(</h1>');
});
router.post('/login', (req, res) => {
    return index_1.loginController.findLogin(req, res);
});
router.post('/new-sale', (req, res) => {
    return index_1.salesController.saveSales(req, res);
});
router.post('/sales-today', (req, res) => {
    return index_1.salesController.findSalesByDate(req, res);
});
router.post('/sales', (req, res) => {
    return index_1.salesController.findSalesByPeriod(req, res);
});
router.post('/schedule', (req, res) => {
    return index_1.scheduleController.findScheduleByDate(req, res);
});
router.post('/new-schedule', (req, res) => {
    return index_1.scheduleController.saveSchedule(req, res);
});
router.put('/update-schedule', (req, res) => {
    return index_1.scheduleController.updateSchedule(req, res);
});
router.delete('/delete-schedule', (req, res) => {
    return index_1.scheduleController.deleteSchedule(req, res);
});
