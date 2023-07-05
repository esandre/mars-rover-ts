import { RoverWithState } from "./roverWithState";

export interface RoverInterface {
  TourneADroite(): RoverWithState;

  TourneAGauche(): RoverWithState;

  Avancer(): RoverWithState;

  Reculer(): RoverWithState;
}
