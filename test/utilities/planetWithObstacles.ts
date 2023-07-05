import { Planet } from "../../src/topology/planet.interface";
import { Point } from "../../src/geometry/point";
import { WholeNumber } from "../../src/math/WholeNumber";

export class PlanetWithObstacles implements Planet {
  private _decorated: Planet;
  private _obstacles: Point[];

  public constructor(decorated: Planet) {
    this._decorated = decorated;
    this._obstacles = [];
  }

  public addObstacle(latitude: number, longitude: number) {
    this._obstacles.push(
      this.Normalizer(
        new Point(new WholeNumber(latitude), new WholeNumber(longitude))
      )
    );
  }

  private isAccessible(point: Point): boolean {
    const normalizePosition = this.Normalizer(point);
    return this._obstacles.includes(normalizePosition);
  }

  public Normalizer(position: Point): Point {
    return this._decorated.Normalizer(position);
  }

  dependingOnAccessibility<T>(
    point: Point,
    actionIfObstacle: () => T,
    actionIfFree: () => T
  ): T {
    if (this.isAccessible(point)) return actionIfFree();
    return actionIfObstacle();
  }
}
