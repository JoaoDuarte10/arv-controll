// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

class Database {
  async connectDB(): Promise<void> {
    try {
      await mongoose.connect(process.env.DB_ACCESS);
      console.log('Connection database successfuly');
    } catch (error) {
      logger.error(error.message);
      console.error(error.message);
    }
  }
}

export { Database };
