import { RoverInterface } from "../rover.interface";

export interface roverCommand {
  executeOn(rover: RoverInterface): RoverInterface;
}
