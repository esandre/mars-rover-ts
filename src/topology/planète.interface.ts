import { Point } from "../geometry/point";

export interface Planet {
  Normalizer(position: Point): Point;

  dependingOnAccessibility<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T;
}
