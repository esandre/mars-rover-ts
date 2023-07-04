import {Orientation} from "../topologie/orientations.ts";
import {Position} from "../geometrie/position.ts";
import {RoverInterface} from "./rover.interface.ts";

export class RoverView implements RoverInterface {
    private readonly Identifiant: number;

    private readonly Orientation: Orientation;
    private readonly Position: Position;

    public constructor(identifiant: number, orientation: Orientation, position: Position) {
        this.Orientation = orientation;
        this.Position = position;
        this.Identifiant = identifiant;
    }

    IdentifiéPar(identifiant: number): boolean {
        return this.Identifiant == identifiant;
    }

    public TourneADroite() : RoverView {
        return new RoverView(this.Identifiant,
            this.Orientation.RotationHoraire(),
            this.Position);
    }

    public TourneAGauche() : RoverView {
        return new RoverView(
            this.Identifiant,
            this.Orientation.RotationAntihoraire(),
            this.Position);
    }

    public Avancer() : RoverView {
        return new RoverView(
            this.Identifiant,
            this.Orientation,
            this.Orientation.FaireAvancer(this.Position));
    }

    public Reculer() : RoverView {
        return new RoverView(
            this.Identifiant,
            this.Orientation,
            this.Orientation.FaireReculer(this.Position));
    }
}