import cors from 'cors';
import { Router, Express } from 'express';
import { readdirSync } from 'fs';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    (await import(`../routes/${fileName}`)).default(router);
  });
};

const router = Router();

router.use(cors());

router.get('/health-check', (req, res) => {
  res.status(201).send();
});

// router.post('/api/login', (req, res) => {
//   return loginController.findLogin(req, res);
// });

// router.post('/api/new-sale', (req, res) => {
//   return salesController.saveSales(req, res);
// });

// router.post('/api/sales-today', (req, res) => {
//   return salesController.findSalesByDate(req, res);
// });

// router.post('/api/sales', (req, res) => {
//   return salesController.findSalesByPeriod(req, res);
// });

// router.post('/api/sales-period-clients', (req, res) => {
//   return salesController.findSalesByClientsForPeriod(req, res);
// });

// router.post('/api/sales-clients', (req, res) => {
//   return salesController.findSalesForClient(req, res);
// });

// router.post('/api/schedule', (req, res) => {
//   return scheduleController.findScheduleByDate(req, res);
// });

// router.post('/api/new-schedule', (req, res) => {
//   return scheduleController.saveSchedule(req, res);
// });

// router.put('/api/update-schedule', (req, res) => {
//   return scheduleController.updateSchedule(req, res);
// });

// router.delete('/api/delete-schedule', (req, res) => {
//   return scheduleController.deleteSchedule(req, res);
// });

// router.delete('/api/finish-schedule', (req, res) => {
//   return scheduleController.finishSchedule(req, res);
// });

// router.post('/api/new-client', (req, res) => {
//   return clientController.newClient(req, res);
// });

// router.post('/api/update-client', (req, res) => {
//   return clientController.updateClient(req, res);
// });

// router.post('/api/find-all-client', (req, res) => {
//   return clientController.findAllClients(req, res);
// });

// router.post('/api/find-client', (req, res) => {
//   return clientController.findClient(req, res);
// });

// router.post('/api/find-client-segment', (req, res) => {
//   return clientController.findClientBySegment(req, res);
// });

// router.post('/api/delete-client', (req, res) => {
//   return clientController.deleteClient(req, res);
// });

// router.get('/api/segments', (req, res) => {
//   return segmentController.findSegment(req, res);
// });

// router.post('/api/new-schedule-client', (req, res) => {
//   return scheduleClientController.saveScheduleClients(req, res);
// });

// router.post('/api/find-schedule-client', (req, res) => {
//   return scheduleClientController.findAllScheduleClients(req, res);
// });

// router.delete('/api/delete-schedule-client', (req, res) => {
//   return scheduleClientController.deleteSchedule(req, res);
// });

// export { router };
