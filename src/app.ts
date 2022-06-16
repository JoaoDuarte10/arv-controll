import express from 'express';
import { router } from './entrypoint/routes';

const app = express();

app.use(express.json());
app.use(router);

export { app };
