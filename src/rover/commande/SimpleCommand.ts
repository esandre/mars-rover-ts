import { roverCommand } from "./RoverCommand";
import { RoverInterface } from "../rover.interface";

export class SimpleCommand implements roverCommand {
  private readonly _letter: string;

  constructor(elementCommand: string) {
    if (elementCommand.length != 1) throw new Error("Not a simple command");

    this._letter = elementCommand;
  }

  executeOn(rover: RoverInterface): RoverInterface {
    if (this._letter == "A") return rover.GoAhead();
    if (this._letter == "R") return rover.BackOff();
    if (this._letter == "D") return rover.TurnRight();
    if (this._letter == "G") return rover.TurnLeft();
    throw new Error("Not a valid command");
  }
}
