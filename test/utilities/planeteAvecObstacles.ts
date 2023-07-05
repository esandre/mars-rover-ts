import { Planet } from "../../src/topology/planète.interface";
import { Point } from "../../src/geometry/point";
import { WholeNumber } from "../../src/math/WholeNumber";

export class PlanèteAvecObstacles implements Planet {
  private _decorated: Planet;
  private _obstacles: Point[];

  public constructor(decorated: Planet) {
    this._decorated = decorated;
    this._obstacles = [];
  }

  public AjouterObstacle(latitude: number, longitude: number) {
    this._obstacles.push(
      this.Normalizer(
        new Point(new WholeNumber(latitude), new WholeNumber(longitude))
      )
    );
  }

  private EstAccessible(point: Point): boolean {
    const positionNormalisée = this.Normalizer(point);
    return this._obstacles.includes(positionNormalisée);
  }

  public Normalizer(position: Point): Point {
    return this._decorated.Normalizer(position);
  }

  dependingOnAccessibility<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T {
    if (this.EstAccessible(point)) return actionSiLibre();
    return actionSiObstacle();
  }
}
