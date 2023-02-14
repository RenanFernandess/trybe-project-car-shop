import { Router } from 'express';
import CarController from '../Controllers';
import CarService from '../Services';

const carService = new CarService();
const carController = new CarController(carService);

const carRouter = Router();

carRouter.post('/', (req, res, next) => carController.create(req, res, next));

export default carRouter;
