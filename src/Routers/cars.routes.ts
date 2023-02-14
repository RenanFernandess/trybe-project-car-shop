import { Router } from 'express';
import CarController from '../Controllers';
import CarService from '../Services';

const carService = new CarService();
const carController = new CarController(carService);

const carRouter = Router();

carRouter.post('/', (req, res, next) => carController.create(req, res, next));
carRouter.get('/', (req, res, next) => carController.findAll(req, res, next));
carRouter.get('/:id', (req, res, next) => carController.findById(req, res, next));

export default carRouter;
