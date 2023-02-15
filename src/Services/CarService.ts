import ICar from '../Interfaces';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import HttpError from '../Errors';
import NOT_FOUND from '../Errors/Messages';

export default class CarService {
  private _model: CarODM;
  constructor() {
    this._model = new CarODM();
  }

  private _createCarDomian(car: ICar | null) {
    return (car) ? new Car(car) : null;
  }

  public async create({ status, ...car }: Omit<ICar, 'id'>) {
    const newCar = await this._model.create({ status: status || false, ...car });
    return this._createCarDomian(newCar);
  }

  public async findAll() {
    const cars = await this._model.findAll();
    if (!cars.length) throw new HttpError(404, NOT_FOUND.CAR_NOT_FOUND);
    return cars.map((car) => this._createCarDomian(car));
  }

  public async findById(id: string) {
    const car = await this._model.findById(id);
    if (!car) throw new HttpError(404, NOT_FOUND.CAR_NOT_FOUND);
    return this._createCarDomian(car);
  }

  public async update(id: string, car: Omit<ICar, 'id'>) {
    const updateCar = await this._model.update(id, car);
    if (!updateCar) throw new HttpError(404, NOT_FOUND.CAR_NOT_FOUND);
    return this._createCarDomian(updateCar);
  }

  public async delete(id: string) {
    const deletedCar = await this._model.delete(id);
    if (!deletedCar) throw new HttpError(404, NOT_FOUND.CAR_NOT_FOUND);
  }
}