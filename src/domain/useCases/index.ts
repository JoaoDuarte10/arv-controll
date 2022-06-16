import { ScheduleUseCase } from './schedule';
import { SalesUseCase } from './sales';
import { LoginUseCase } from './login';
import { ClientUseCase } from './client';
import { SegmentUseCase } from './segment';
import { ScheduleClientUseCase } from './schedule-client';

const scheduleRepositoryMongoDB = new ScheduleRepositoryMongoDB();
const salesRepositoryMongo = new SalesRepositoryMongoDB();
const loginRepositoryMongo = new LoginRepositoryMongo();
const clientRepositoryMongo = new ClientRepositoryMongo();
const segmentRepositoryMongo = new SegmentRepositoryMongo();
const scheduleClientRepositoryMongo = new ScheduleClientRepositoryMongo();

const scheduleUseCase = new ScheduleUseCase(
  scheduleRepositoryMongoDB,
  salesRepositoryMongo,
);
const salesUseCase = new SalesUseCase(salesRepositoryMongo);
const loginUseCase = new LoginUseCase(loginRepositoryMongo);
const clientUseCase = new ClientUseCase(clientRepositoryMongo);
const segmentUseCase = new SegmentUseCase(segmentRepositoryMongo);
const scheduleClientUseCase = new ScheduleClientUseCase(
  scheduleClientRepositoryMongo,
);

const scheduleController = new ScheduleController(scheduleUseCase);
const salesController = new SalesController(salesUseCase);
const loginController = new LoginController(loginUseCase);
const clientController = new ClientController(clientUseCase);
const segmentController = new SegmentController(segmentUseCase);
const scheduleClientController = new ScheduleClientController(
  scheduleClientUseCase,
);

export {
  scheduleController,
  salesController,
  loginController,
  clientController,
  segmentController,
  scheduleClientController,
};
