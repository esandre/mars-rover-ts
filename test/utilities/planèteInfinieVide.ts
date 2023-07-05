import { Planet } from "../../src/topology/planète.interface";
import { Point } from "../../src/geometry/point";

export class PlanèteInfinieVide implements Planet {
  Normalizer(point: Point): Point {
    return point;
  }

  dependingOnAccessibility<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T {
    return actionSiLibre();
  }
}
