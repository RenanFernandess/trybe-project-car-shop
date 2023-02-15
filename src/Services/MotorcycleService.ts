import { IMotorcycle } from '../Interfaces';
import { Motorcycle } from '../Domains';
import HttpError from '../Errors';
import NOT_FOUND from '../Errors/Messages';
import { MotorcycleODM } from '../Models';

export default class MotorcycleService {
  private _model: MotorcycleODM;
  constructor() {
    this._model = new MotorcycleODM();
  }

  private _createMotorcycleDomian(motorcycle: IMotorcycle | null) {
    return (motorcycle) ? new Motorcycle(motorcycle) : null;
  }

  public async create({ status, ...motorcycle }: Omit<IMotorcycle, 'id'>) {
    const newMotorcycle = await this._model.create({ status: status || false, ...motorcycle });
    return this._createMotorcycleDomian(newMotorcycle);
  }

  public async findAll() {
    const motorcycles = await this._model.findAll();
    if (!motorcycles.length) throw new HttpError(404, NOT_FOUND.MOTORCYCLE);
    return motorcycles.map((motorcycle) => this._createMotorcycleDomian(motorcycle));
  }

  public async findById(id: string) {
    const motorcycle = await this._model.findById(id);
    if (!motorcycle) throw new HttpError(404, NOT_FOUND.MOTORCYCLE);
    return this._createMotorcycleDomian(motorcycle);
  }

  public async update(id: string, motorcycle: Omit<IMotorcycle, 'id'>) {
    const updateMotorcycle = await this._model.update(id, motorcycle);
    if (!updateMotorcycle) throw new HttpError(404, NOT_FOUND.MOTORCYCLE);
    return this._createMotorcycleDomian(updateMotorcycle);
  }

  public async delete(id: string) {
    const deletedMotorcycle = await this._model.delete(id);
    if (!deletedMotorcycle) throw new HttpError(404, NOT_FOUND.MOTORCYCLE);
  }
}