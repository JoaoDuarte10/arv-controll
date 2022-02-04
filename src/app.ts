import express from "express";
import { router } from "./routes"
import path = require('path');
import { logger } from "./utils/logger"

const app = express();

app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, '../build')))

app.get('/schedule', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
app.get('/pos-schedule', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
export { app };