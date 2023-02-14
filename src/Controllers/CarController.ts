import { NextFunction, Request, Response } from 'express';
import CarService from '../Services';

export default class CarController {
  constructor(
    private _sevice: CarService,
  ) {}

  public async create({ body }: Request, res: Response, _next: NextFunction) {
    const {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    } = body;
    const car = await this._sevice.create({
      model, year, color, status, buyValue, doorsQty, seatsQty,
    });
    res.status(201).json(car);
  } 
}