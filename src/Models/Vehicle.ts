import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import HttpError from '../Errors';
import { UNPROCESSABLE_ENTITY } from '../Errors/Messages';

export default abstract class Vehicle<T> {
  protected model: Model<T>;

  constructor(
    protected schema: Schema,
    protected modelName: string,
  ) {
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public create(obj: Omit<T, 'id'>) {
    return this.model.create({ ...obj });
  }

  public update(_id: string, obj: Partial<T>) {
    if (!isValidObjectId(_id)) throw new HttpError(422, UNPROCESSABLE_ENTITY.MONGO_ID);

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public delete(id: string) {
    if (!isValidObjectId(id)) throw new HttpError(422, UNPROCESSABLE_ENTITY.MONGO_ID);
    return this.model.findByIdAndDelete(id);
  }

  public findAll() {
    return this.model.find();
  }

  public findById(id: string) {
    if (!isValidObjectId(id)) throw new HttpError(422, UNPROCESSABLE_ENTITY.MONGO_ID);
    return this.model.findById(id);
  }
}
