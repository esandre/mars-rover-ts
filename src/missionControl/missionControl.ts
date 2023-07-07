import { Orientation } from "../topology/orientation";
import { Planet } from "../topology/planet.interface";
import { RoverInterpreter } from "../interpreter/roverInterpreter";
import { MissionControlInterface } from "./missionControl.interface";
import { RoverWithState } from "../rover/roverWithState";
import { roverCommandInterface } from "../rover/commande/roverCommand.interface";
import { Position } from "../geometry/position";

export class MissionControl implements MissionControlInterface {
  private readonly _orientation: Orientation;
  private readonly _planet: Planet;
  private readonly _roverInterpreter: RoverInterpreter;
  private readonly _roverWithState: RoverWithState;

  public constructor(
    orientation: Orientation,
    planet: Planet,
    roverInterpreter: RoverInterpreter,
    roverWithState: RoverWithState
  ) {
    this._orientation = orientation;
    this._planet = planet;
    this._roverInterpreter = roverInterpreter;
    this._roverWithState = roverWithState;
  }

  public moveCoordinates(command: roverCommandInterface) {
    const newPosition = this._roverWithState.Position;

    if (this.hasObstacleOnPath(newPosition)) {
      this._roverInterpreter.Interpreter(command);
    }
  }

  private hasObstacleOnPath(position: Position): boolean {
    const point = position.getPoint();
    return this._planet.dependingOnAccessibility<boolean>(
      point,
      () => true,
      () => false
    );
  }
}
