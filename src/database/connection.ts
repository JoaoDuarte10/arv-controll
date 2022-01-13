require('dotenv').config();
import mongoose from 'mongoose';

class Database {
    async connectDB() {
        try {
            await mongoose.connect(process.env.DB_ACCESS)
            console.log('Connection database successfuly')
        } catch (error) {
            console.error(error.message);
        }
    }
}

export { Database }