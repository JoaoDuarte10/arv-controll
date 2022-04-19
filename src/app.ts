import express from 'express';
import { router } from './routes';
import path = require('path');

const app = express();

app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

export { app };
