import { Position } from "../../src/geometry/position";
import { PlanèteInfinieVide } from "./planèteInfinieVide";
import { Point } from "../../src/geometry/point";
import { Planet } from "../../src/topology/planète.interface";
import { WholeNumber } from "../../src/math/WholeNumber";

export class PositionBuilder {
  static Origine(): Position {
    return new PositionBuilder().Build();
  }

  private _latitude: WholeNumber = WholeNumber.Zero;
  private _longitude: WholeNumber = WholeNumber.Zero;
  private _planète: Planet = new PlanèteInfinieVide();

  public AyantPourCoordonnées(
    latitude: number,
    longitude: number
  ): PositionBuilder {
    this._latitude = new WholeNumber(latitude);
    this._longitude = new WholeNumber(longitude);
    return this;
  }

  Build(): Position {
    return new Position(
      new Point(this._latitude, this._longitude),
      this._planète
    );
  }

  Origine() {
    return this.AyantPourCoordonnées(0, 0);
  }

  SurPlanète(planète: Planet) {
    this._planète = planète;
    return this;
  }
}
