import {Point} from "../geometrie/point.ts";
import {RepésentateurPlanèteInterface} from "../ui/représentateurPlanète.interface.ts";

export interface Planète {
    Normaliser(position: Point) : Point;
    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T;
    Visiter(représentateur: RepésentateurPlanèteInterface): void;
}