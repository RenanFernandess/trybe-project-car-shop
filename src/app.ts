import express from 'express';
import errorRequestHandler from './Middlewares';
import carRouter from './Routers';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

app.use(errorRequestHandler);

export default app;
