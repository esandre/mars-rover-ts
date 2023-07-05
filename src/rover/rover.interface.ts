import {RoverWithState} from "./roverWithState.ts";

export interface RoverInterface {
    TourneADroite() : RoverWithState;
    TourneAGauche(): RoverWithState;
    Avancer() : RoverWithState;
    Reculer(): RoverWithState;
}