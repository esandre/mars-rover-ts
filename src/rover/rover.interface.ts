import { RoverWithState } from "./roverWithState";

export interface RoverInterface {
  turnRight(): RoverWithState;

  turnLeft(): RoverWithState;

  goAhead(): RoverWithState;

  backOff(): RoverWithState;
}
