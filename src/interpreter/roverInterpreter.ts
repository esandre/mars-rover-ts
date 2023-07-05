import { RoverWithState } from "../rover/roverWithState";
import { RoverInterface } from "../rover/rover.interface";
import { roverCommand } from "../rover/commande/RoverCommand";

export class RoverInterpreter implements RoverInterface {
  private readonly _rover: RoverInterface;

  public constructor(pilotedRover: RoverInterface) {
    this._rover = pilotedRover;
  }

  public Interpreter(command: roverCommand): RoverInterpreter {
    return new RoverInterpreter(command.executeOn(this._rover));
  }

  public GoAhead(): RoverWithState {
    return this._rover.GoAhead();
  }

  public BackOff(): RoverWithState {
    return this._rover.BackOff();
  }

  public TurnRight(): RoverWithState {
    return this._rover.TurnRight();
  }

  public TurnLeft(): RoverWithState {
    return this._rover.TurnLeft();
  }
}
