import {Orientation} from "../topologie/orientations";
import {Position} from "../geometrie/position";
import {RoverInterface} from "./rover.interface";

export class RoverWithState implements RoverInterface {
    public readonly Orientation: Orientation;
    public readonly Position: Position;

    public constructor(orientation: Orientation, position: Position) {
        this.Orientation = orientation;
        this.Position = position;
    }

    public TourneADroite() : RoverWithState {
        return new RoverWithState(
            this.Orientation.RotationHoraire(),
            this.Position);
    }

    public TourneAGauche() : RoverWithState {
        return new RoverWithState(
            this.Orientation.RotationAntihoraire(),
            this.Position);
    }

    public Avancer() : RoverWithState {
        return new RoverWithState(
            this.Orientation,
            this.Orientation.FaireAvancer(this.Position));
    }

    public Reculer() : RoverWithState {
        return new RoverWithState(
            this.Orientation,
            this.Orientation.FaireReculer(this.Position));
    }
}