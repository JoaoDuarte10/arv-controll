require('dotenv').config();
import { app } from './app';
import { Database } from './database/connection';
import { logger } from './utils/logger';

const db = new Database();

try {
  db.connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on PORT ${process.env.PORT || 5000}`);
  });
} catch (error) {
  logger.error(error.message);
}
