import express from 'express';
import errorRequestHandler from './Middlewares';
import carRouter, { motorcycleRouter } from './Routers';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

app.use(errorRequestHandler);

export default app;
