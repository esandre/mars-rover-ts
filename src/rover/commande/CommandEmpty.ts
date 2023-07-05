import { roverCommand } from "./RoverCommand";
import { RoverInterface } from "../rover.interface";

export class CommandEmpty implements roverCommand {
  executeOn(rover: RoverInterface): RoverInterface {
    return rover;
  }
}
