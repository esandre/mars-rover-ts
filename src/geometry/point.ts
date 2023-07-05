import { WholeNumber } from "../math/WholeNumber";

export class Point {
  private readonly _latitude: WholeNumber;
  private readonly _longitude: WholeNumber;

  constructor(latitude: WholeNumber, longitude: WholeNumber) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  public modulo2D(modulo: Point) {
    const latitude = this._latitude.Modulo(modulo._latitude);
    const longitude = this._longitude.Modulo(modulo._longitude);

    return new Point(latitude, longitude);
  }

  public incrementLatitude(): Point {
    return new Point(this._latitude.Increment(), this._longitude);
  }

  public decrementLatitude(): Point {
    return new Point(this._latitude.Decrement(), this._longitude);
  }

  public IncrementLongitude(): Point {
    return new Point(this._latitude, this._longitude.Increment());
  }

  public DecrementLongitude(): Point {
    return new Point(this._latitude, this._longitude.Decrement());
  }
}
