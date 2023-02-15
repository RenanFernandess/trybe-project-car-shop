import ICar from '../Interfaces';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor({ doorsQty, seatsQty, ...car }: ICar) {
    super(car);
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
}
