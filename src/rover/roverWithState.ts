import { Orientation } from "../topology/orientations";
import { Position } from "../geometry/position";
import { RoverInterface } from "./rover.interface";

export class RoverWithState implements RoverInterface {
  public readonly Orientation: Orientation;
  public readonly Position: Position;

  public constructor(orientation: Orientation, position: Position) {
    this.Orientation = orientation;
    this.Position = position;
  }

  public TurnRight(): RoverWithState {
    return new RoverWithState(
      this.Orientation.ClockwiseRotation(),
      this.Position
    );
  }

  public TurnLeft(): RoverWithState {
    return new RoverWithState(
      this.Orientation.AntiClockwiseRotation(),
      this.Position
    );
  }

  public GoAhead(): RoverWithState {
    return new RoverWithState(
      this.Orientation,
      this.Orientation.GoAhead(this.Position)
    );
  }

  public BackOff(): RoverWithState {
    return new RoverWithState(
      this.Orientation,
      this.Orientation.Backoff(this.Position)
    );
  }
}
