import { NextFunction, Request, Response } from 'express';
import CarService from '../Services';

export default class CarController {
  constructor(
    private _sevice: CarService,
  ) {}

  public async create({ body }: Request, res: Response, next: NextFunction) {
    const {
      model, year, color, status, buyValue, doorsQty, seatsQty,
    } = body;
    try {
      const car = await this._sevice.create({
        model, year, color, status, buyValue, doorsQty, seatsQty,
      });
      return res.status(201).json(car);
    } catch (error) {
      return next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await this._sevice.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      return next(error);
    }
  }

  public async findById({ params: { id } }: Request, res: Response, next: NextFunction) {
    try {
      const car = await this._sevice.findById(id);
      return res.status(200).json(car);
    } catch (error) {
      return next(error);
    }
  }

  public async update({ params: { id }, body }: Request, res: Response, next: NextFunction) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = body;
    try {
      const updatedCar = await this._sevice.update(
        id,
        { model, year, color, status, buyValue, doorsQty, seatsQty },
      );
      return res.status(200).json(updatedCar);
    } catch (error) {
      return next(error);
    }
  }
}