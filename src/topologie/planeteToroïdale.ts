import {Planète} from "./planète.interface.ts";
import {Point} from "../geometrie/point.ts";
import {Entier} from "../math/Entier.ts";
import {RepésentateurPlanèteInterface} from "../ui/représentateurPlanète.interface.ts";

export class PlanèteToroïdaleVide implements Planète {
    private readonly _pointMax : Point;
    private readonly _taille: Entier;

    constructor(taille: Entier) {
        this._pointMax = new Point(taille, taille);
        this._taille = taille;
    }

    Normaliser(point: Point): Point {
        return point.Modulo2D(this._pointMax);
    }

    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T {
        return actionSiLibre();
    }

    Visiter(représentateur: RepésentateurPlanèteInterface): void {
        let latitudesRestantes = this._taille;

        while (!latitudesRestantes.EstZéro()) {
            let longitudesRestantes = this._taille;
            while (!longitudesRestantes.EstZéro()){
                représentateur.ReprésenterCelluleVide();
                longitudesRestantes = longitudesRestantes.Décrémenter();
            }

            représentateur.LatitudeSuivante();
            latitudesRestantes = latitudesRestantes.Décrémenter();
        }
    }
}