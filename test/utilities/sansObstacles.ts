import {PossèdeObstacles} from "../../src/topologie/possedeObstacles.interface";
import {Point} from "../../src/geometrie/point";

export class SansObstacles implements PossèdeObstacles {
    SelonAccessibilité<T>(_: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T {
        return actionSiLibre();
    }
}