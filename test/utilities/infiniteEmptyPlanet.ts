import { Planet } from "../../src/topology/planet.interface";
import { Point } from "../../src/geometry/point";

export class infiniteEmptyPlanet implements Planet {
  Normalizer(point: Point): Point {
    return point;
  }

  dependingOnAccessibility<T>(
    point: Point,
    actionIfObstacle: () => T,
    actionIfFree: () => T
  ): T {
    return actionIfFree();
  }
}
