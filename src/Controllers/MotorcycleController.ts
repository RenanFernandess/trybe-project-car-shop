import { NextFunction, Request, Response } from 'express';
import { MotorcycleService } from '../Services';

export default class MotorcycleController {
  constructor(
    private _sevice: MotorcycleService,
  ) {}

  public async create({ body }: Request, res: Response, next: NextFunction) {
    const { model, year, color, status, buyValue, category, engineCapacity } = body;
    try {
      const Motorcycle = await this._sevice.create({
        model, year, color, status, buyValue, category, engineCapacity,
      });
      return res.status(201).json(Motorcycle);
    } catch (error) {
      return next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Motorcycles = await this._sevice.findAll();
      return res.status(200).json(Motorcycles);
    } catch (error) {
      return next(error);
    }
  }

  public async findById({ params: { id } }: Request, res: Response, next: NextFunction) {
    try {
      const Motorcycle = await this._sevice.findById(id);
      return res.status(200).json(Motorcycle);
    } catch (error) {
      return next(error);
    }
  }

  public async update({ params: { id }, body }: Request, res: Response, next: NextFunction) {
    const { model, year, color, status, buyValue, category, engineCapacity } = body;
    try {
      const updatedMotorcycle = await this._sevice.update(
        id,
        { model, year, color, status, buyValue, category, engineCapacity },
      );
      return res.status(200).json(updatedMotorcycle);
    } catch (error) {
      return next(error);
    }
  }

  public async delete({ params: { id } }: Request, res: Response, next: NextFunction) {
    try {
      await this._sevice.delete(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}