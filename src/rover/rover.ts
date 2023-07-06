import { Orientation } from "../topology/orientation";
import { Planet } from "../topology/planet.interface";
import { RoverInterpreter } from "../interpreter/roverInterpreter";

export class Rover {
  private readonly _orientation: Orientation;
  private readonly _planet: Planet;
  private readonly _interpreter: RoverInterpreter;

  public constructor(
    orientation: Orientation,
    planet: Planet,
    interpreter: RoverInterpreter
  ) {
    this._orientation = orientation;
    this._planet = planet;
    this._interpreter = interpreter;
  }
}
