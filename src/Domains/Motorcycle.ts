import { IMotorcycle } from '../Interfaces';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor({ category, engineCapacity, ...motorcycle }: IMotorcycle) {
    super(motorcycle);
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}