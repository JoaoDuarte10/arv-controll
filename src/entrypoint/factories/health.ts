import { HealthCheckController } from '../http/controllers/health/health-check';

export const makeHealthCheckController = () => {
  return new HealthCheckController();
};
