"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = require("./app");
const connection_1 = require("./database/connection");
const logger_1 = require("./utils/logger");
const db = new connection_1.Database();
try {
    db.connectDB();
    app_1.app.listen(process.env.PORT || 5000, () => {
        console.log('Server running');
    });
}
catch (error) {
    logger_1.logger.error(error.message);
}
