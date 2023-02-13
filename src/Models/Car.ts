import { Schema } from 'mongoose';
import Vehicle from './Vehicle';
import ICar from '../Interfaces';

export default class Car extends Vehicle<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { tyep: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { tyep: Number, required: true },
      doorsQty: { tyep: Number, required: true },
      seatsQty: { tyep: Number, required: true },
    });
    super(schema, 'Car');
  }
}