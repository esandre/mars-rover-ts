import {Planète} from "../../src/topologie/planète.interface";
import {Point} from "../../src/geometrie/point";
import {RepésentateurPlanèteInterface} from "../../src/ui/représentateurPlanète.interface";

export class PlanèteInfinieVide implements Planète {
    Normaliser(point: Point): Point {
        return point;
    }

    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T {
        return actionSiLibre();
    }

    Visiter(représentateur: RepésentateurPlanèteInterface): void {
        throw new Error("Do not call, infinite planet !");
    }
}