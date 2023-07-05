import {RoverWithState} from "../rover/roverWithState";
import {RoverInterface} from "../rover/rover.interface";
import {CommandeRover} from "../rover/commande/CommandeRover";

export class InterpréteurRover implements RoverInterface {
    private readonly _rover: RoverInterface;

    public constructor(roverCommandé: RoverInterface) {
        this._rover = roverCommandé;
    }

    public Interpréter(commande: CommandeRover) : InterpréteurRover {
        return new InterpréteurRover(commande.ExécuterSur(this._rover));
    }

    public Avancer(): RoverWithState {
        return this._rover.Avancer();
    }

    Reculer(): RoverWithState {
        return this._rover.Reculer();
    }

    TourneADroite(): RoverWithState {
        return this._rover.TourneADroite();
    }

    TourneAGauche(): RoverWithState {
        return this._rover.TourneAGauche();
    }
}