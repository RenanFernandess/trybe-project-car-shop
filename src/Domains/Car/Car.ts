import ICar from '../../Interfaces';

export default class Car {
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;

  constructor({
    model, year, color, status, buyValue, doorsQty, seatsQty,
  }: Omit<ICar, 'id'>) {
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
    this._doorsQty = doorsQty;
    this._seatsQty = seatsQty;
  }

  get doorsQty() { return this._doorsQty; }
  get seatsQty() { return this._seatsQty; }
}
