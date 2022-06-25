import cors from 'cors';
import { Router, Express } from 'express';
import { readdirSync } from 'fs';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(cors());
  app.use('/api', router);
  readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
    (await import(`../routes/${fileName}`)).default(router);
  });
};

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

// router.post('/api/new-schedule-client', (req, res) => {
//   return scheduleClientController.saveScheduleClients(req, res);
// });

// router.post('/api/find-schedule-client', (req, res) => {
//   return scheduleClientController.findAllScheduleClients(req, res);
// });

// router.delete('/api/delete-schedule-client', (req, res) => {
//   return scheduleClientController.deleteSchedule(req, res);
// });
