import { ScheduleController } from '../controllers/scheduleController';
import { SalesController } from '../controllers/salesController';
import { LoginController } from '../controllers/loginController';
import { ClientController } from '../controllers/clientController';
import { SegmentController } from '../controllers/segmentController';

import { ScheduleUseCase } from './scheduleUseCase';
import { SalesUseCase } from './salesUseCase';
import { LoginUseCase } from './loginUseCase';
import { ClientUseCase } from './clientUseCase';
import { SegmentUseCase } from './segmentUseCase';

import { ScheduleRepositoryMongoDB } from '../repository/implements/scheduleRepositoryMongo';
import { SalesRepositoryMongoDB } from '../repository/implements/salesRepositoryMongo';
import { LoginRepositoryMongo } from '../repository/implements/loginRepositoryMongo';
import { ClientRepositoryMongo } from '../repository/implements/clientRepositoryMongo'; 
import { SegmentRepositoryMongo } from '../repository/implements/segmentRepositoryMongo';

const scheduleRepositoryMongoDB = new ScheduleRepositoryMongoDB();
const salesRepositoryMongo = new SalesRepositoryMongoDB();
const loginRepositoryMongo = new LoginRepositoryMongo();
const clientRepositoryMongo = new ClientRepositoryMongo();
const segmentRepositoryMongo = new SegmentRepositoryMongo();

const scheduleUseCase = new ScheduleUseCase(scheduleRepositoryMongoDB);
const salesUseCase = new SalesUseCase(salesRepositoryMongo);
const loginUseCase = new LoginUseCase(loginRepositoryMongo);
const clientUseCase = new ClientUseCase(clientRepositoryMongo);
const segmentUseCase = new SegmentUseCase(segmentRepositoryMongo)

const scheduleController = new ScheduleController(scheduleUseCase);
const salesController = new SalesController(salesUseCase)
const loginController = new LoginController(loginUseCase);
const clientController = new ClientController(clientUseCase);
const segmentController = new SegmentController(segmentUseCase);

export { scheduleController, salesController, loginController, clientController, segmentController }