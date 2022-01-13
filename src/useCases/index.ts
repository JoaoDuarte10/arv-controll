import { ScheduleController } from '../controllers/scheduleController';
import { SalesController } from '../controllers/salesController';
import { LoginController } from '../controllers/loginController';

import { ScheduleUseCase } from './scheduleUseCase';
import { SalesUseCase } from './salesUseCase';
import { LoginUseCase } from './loginUseCase';

import { ScheduleRepositoryMongoDB } from '../repository/implements/scheduleRepositoryMongo';
import { SalesRepositoryMongoDB } from '../repository/implements/salesRepositoryMongo';
import { LoginRepositoryMongo } from '../repository/implements/loginRepositoryMongo'

const scheduleRepositoryMongoDB = new ScheduleRepositoryMongoDB();
const salesRepositoryMongo = new SalesRepositoryMongoDB();
const loginRepositoryMongo = new LoginRepositoryMongo();

const scheduleUseCase = new ScheduleUseCase(scheduleRepositoryMongoDB);
const salesUseCase = new SalesUseCase(salesRepositoryMongo);
const loginUseCase = new LoginUseCase(loginRepositoryMongo);

const scheduleController = new ScheduleController(scheduleUseCase);
const salesController = new SalesController(salesUseCase)
const loginController = new LoginController(loginUseCase);

export { scheduleController, salesController, loginController }