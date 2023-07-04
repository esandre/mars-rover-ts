import {RoverView} from "./roverView.ts";

export interface RoverInterface {
    TourneADroite() : RoverView;
    TourneAGauche(): RoverView;
    Avancer() : RoverView;
    Reculer(): RoverView;
    IdentifiéPar(identifiant: number): boolean;
}