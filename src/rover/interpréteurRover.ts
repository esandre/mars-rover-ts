import {RoverView} from "./roverView.ts";
import {RoverInterface} from "./rover.interface.ts";
import {CommandeRover} from "./commande/CommandeRover.ts";

export class InterpréteurRover implements RoverInterface {
    private readonly _rover: RoverInterface;

    public constructor(roverCommandé: RoverInterface) {
        this._rover = roverCommandé;
    }

    public Interpréter(commande: CommandeRover) : InterpréteurRover {
        return new InterpréteurRover(commande.ExécuterSur(this._rover));
    }

    public Avancer(): RoverView {
        return this._rover.Avancer();
    }

    Reculer(): RoverView {
        return this._rover.Reculer();
    }

    TourneADroite(): RoverView {
        return this._rover.TourneADroite();
    }

    TourneAGauche(): RoverView {
        return this._rover.TourneAGauche();
    }
}