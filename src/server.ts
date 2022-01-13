require('dotenv').config();
import { app } from './app';

import { Database } from './database/connection'

const db = new Database();

db.connectDB()

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running')
})