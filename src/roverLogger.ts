import {RoverInterface} from "./rover/rover.interface.ts";
import {EtatRover} from "./rover/etatRover.ts";

export class RoverLogger implements RoverInterface {
    private _logged: RoverInterface;
    private _etats: EtatRover[] = [];

    public constructor(logged: RoverInterface) {
        this._logged = logged;
    }

    private StockerEtRenvoyer(etat: EtatRover){
        this._etats.push(etat);
        return etat
    }

    Avancer(): EtatRover {
        return this.StockerEtRenvoyer(this._logged.Avancer());
    }

    Reculer(): EtatRover {
        return this.StockerEtRenvoyer(this._logged.Reculer());
    }

    TourneADroite(): EtatRover {
        return this.StockerEtRenvoyer(this._logged.TourneADroite());
    }

    TourneAGauche(): EtatRover {
        return this.StockerEtRenvoyer(this._logged.TourneAGauche());
    }

    public toString(): string{
        let log = "Log du Rover";
        log.concat("\n");

        for (const etat of this._etats) {
            log.concat("Le rover ...")
        }

        return log;
    }
}