import ICar from '../Interfaces';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

export default class CarService {
  private _model: CarODM;
  constructor() {
    this._model = new CarODM();
  }

  public createCarDomian(car: ICar | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create({ status, ...car }: Omit<ICar, 'id'>) {
    const newCar = await this._model.create({ status: status || false, ...car });
    // console.log(newCar);
  
    return this.createCarDomian(newCar);
  }
}