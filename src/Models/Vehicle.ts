import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import HttpError from '../Errors';
import NOT_FOUND from '../Errors/Messages';

export default abstract class Vehicle<T> {
  protected model: Model<T>;

  constructor(
    protected schema: Schema,
    protected modelName: string,
  ) {
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public create(obj: T) {
    return this.model.create({ ...obj });
  }

  public update(_id: string, obj: Partial<T>) {
    if (isValidObjectId(_id)) throw new HttpError(404, NOT_FOUND.INVALID_ID);

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}
