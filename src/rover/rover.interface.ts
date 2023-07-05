import { RoverWithState } from "./roverWithState";

export interface RoverInterface {
  turnRight(): RoverWithState;

  turnLeft(): RoverWithState;

  GoAhead(): RoverWithState;

  BackOff(): RoverWithState;
}
