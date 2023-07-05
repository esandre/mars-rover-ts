import { Planet } from "./planet.interface";
import { Point } from "../geometry/point";
import { WholeNumber } from "../math/WholeNumber";

export class EmptyToroidalPlanet implements Planet {
  private readonly _pointMax: Point;

  constructor(size: WholeNumber) {
    this._pointMax = new Point(size, size);
  }

  Normalizer(point: Point): Point {
    return point.modulo2D(this._pointMax);
  }

  dependingOnAccessibility<T>(
    point: Point,
    actionIfObstacle: () => T,
    actionIfFree: () => T
  ): T {
    return actionIfFree();
  }
}
