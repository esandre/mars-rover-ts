import { Orientation, Orientations } from "../../src/topology/orientation";
import { Position } from "../../src/geometry/position";
import { PositionBuilder } from "./position.builder";
import { RoverWithState } from "../../src/rover/roverWithState";

export class RoverBuilder {
  private _orientation: Orientation = Orientations.North;
  private _position: Position = PositionBuilder.origin();

  havingForOrientation(orientation: Orientation): RoverBuilder {
    this._orientation = orientation;
    return this;
  }

  havingForPosition(position: Position): RoverBuilder {
    this._position = position;
    return this;
  }

  build(): RoverWithState {
    return new RoverWithState(this._orientation, this._position);
  }
}
