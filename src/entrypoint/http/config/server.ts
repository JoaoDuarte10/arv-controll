// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { app } from './app';
import { Database } from '../../../infrastructure/database/connection';
import { logger } from '../../../infrastructure/utils/logger';

const db = new Database();

async function closeGracefully(signal) {
  await db.closeDB();
  console.log(`${signal}: Exit application... Bye!`);

  process.exit();
}

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);

try {
  db.connectDB();

  app.listen(process.env.PORT || 5000, () => {
    logger.info(`Server running on PORT ${process.env.PORT || 5000}`);
  });
} catch (error) {
  logger.error(error.message);
}
