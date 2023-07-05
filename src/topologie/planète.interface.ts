import { Point } from "../geometrie/point";

export interface Planète {
  Normaliser(position: Point): Point;

  SelonAccessibilité<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T;
}
