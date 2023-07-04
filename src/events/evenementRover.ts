import {RoverInterface} from "../rover/rover.interface.ts";
export abstract class EvenementRover {
    private _roverConcerné: number;
    private _timestamp: number;

    public constructor(roverConcerné: number, timestamp: number) {
        this._roverConcerné = roverConcerné;
        this._timestamp = timestamp;
    }

    protected abstract Appliquer(rover: RoverInterface): RoverInterface;
    protected abstract Annuler(rover: RoverInterface): RoverInterface;

    public CompareTo(other: EvenementRover): number{
        return this._timestamp - other._timestamp;
    }

    public AppliquerSiRoverCorrect(rover: RoverInterface) : RoverInterface {
        if(rover.IdentifiéPar(this._roverConcerné))
            return this.Appliquer(rover);

        return rover;
    }

    public AnnulerSiRoverCorrect(rover: RoverInterface) : RoverInterface {
        if(rover.IdentifiéPar(this._roverConcerné))
            return this.Annuler(rover);

        return rover;
    }
}

export class AvancementEvenement extends EvenementRover {
    Appliquer(rover: RoverInterface): RoverInterface {
        return rover.Avancer();
    }

    Annuler(rover: RoverInterface): RoverInterface {
        return rover.Reculer();
    }
}

export class ReculEvenement extends EvenementRover {
    Appliquer(rover: RoverInterface): RoverInterface {
        return rover.Reculer();
    }

    protected Annuler(rover: RoverInterface): RoverInterface {
        return rover.Avancer();
    }
}