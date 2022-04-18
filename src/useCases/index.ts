import { ScheduleController } from '../controllers/scheduleController';
import { SalesController } from '../controllers/salesController';
import { LoginController } from '../controllers/loginController';
import { ClientController } from '../controllers/clientController';
import { SegmentController } from '../controllers/segmentController';
import { ScheduleClientController } from '../controllers/scheduleClientController';

import { ScheduleUseCase } from './scheduleUseCase';
import { SalesUseCase } from './salesUseCase';
import { LoginUseCase } from './loginUseCase';
import { ClientUseCase } from './clientUseCase';
import { SegmentUseCase } from './segmentUseCase';
import { ScheduleClientUseCase } from './scheduleClientUseCase';

import { ScheduleRepositoryMongoDB } from '../repository/implements/scheduleRepositoryMongo';
import { SalesRepositoryMongoDB } from '../repository/implements/salesRepositoryMongo';
import { LoginRepositoryMongo } from '../repository/implements/loginRepositoryMongo';
import { ClientRepositoryMongo } from '../repository/implements/clientRepositoryMongo';
import { SegmentRepositoryMongo } from '../repository/implements/segmentRepositoryMongo';
import { ScheduleClientRepositoryMongo } from '../repository/implements/scheduleClientRepositoryMongo';

const scheduleRepositoryMongoDB = new ScheduleRepositoryMongoDB();
const salesRepositoryMongo = new SalesRepositoryMongoDB();
const loginRepositoryMongo = new LoginRepositoryMongo();
const clientRepositoryMongo = new ClientRepositoryMongo();
const segmentRepositoryMongo = new SegmentRepositoryMongo();
const scheduleClientRepositoryMongo = new ScheduleClientRepositoryMongo();

const scheduleUseCase = new ScheduleUseCase(scheduleRepositoryMongoDB, salesRepositoryMongo);
const salesUseCase = new SalesUseCase(salesRepositoryMongo);
const loginUseCase = new LoginUseCase(loginRepositoryMongo);
const clientUseCase = new ClientUseCase(clientRepositoryMongo);
const segmentUseCase = new SegmentUseCase(segmentRepositoryMongo);
const scheduleClientUseCase = new ScheduleClientUseCase(scheduleClientRepositoryMongo);

const scheduleController = new ScheduleController(scheduleUseCase);
const salesController = new SalesController(salesUseCase)
const loginController = new LoginController(loginUseCase);
const clientController = new ClientController(clientUseCase);
const segmentController = new SegmentController(segmentUseCase);
const scheduleClientController = new ScheduleClientController(scheduleClientUseCase)

export { scheduleController, salesController, loginController, clientController, segmentController, scheduleClientController }