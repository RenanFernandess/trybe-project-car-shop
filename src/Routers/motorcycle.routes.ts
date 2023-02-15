import { Router } from 'express';
import { MotorcycleController } from '../Controllers';
import { MotorcycleService } from '../Services';

const motorcycleRouter = Router();

const motorcycleService = new MotorcycleService();
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRouter.post('/', (req, res, next) => motorcycleController.create(req, res, next));
motorcycleRouter.get('/', (req, res, next) => motorcycleController.findAll(req, res, next));
motorcycleRouter.get('/:id', (req, res, next) => motorcycleController.findById(req, res, next));
motorcycleRouter.put('/:id', (req, res, next) => motorcycleController.update(req, res, next));
motorcycleRouter.delete('/:id', (req, res, next) => motorcycleController.delete(req, res, next));

export default motorcycleRouter;
