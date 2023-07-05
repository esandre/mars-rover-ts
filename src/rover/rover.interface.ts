import { RoverWithState } from "./roverWithState";

export interface RoverInterface {
  TurnRight(): RoverWithState;

  TurnLeft(): RoverWithState;

  GoAhead(): RoverWithState;

  BackOff(): RoverWithState;
}
