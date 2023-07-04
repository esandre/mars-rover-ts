import {RoverView} from "./rover/roverView.ts";
import {Orientations} from "./topologie/orientations.ts";
import {Position} from "./geometrie/position.ts";
import {PlanèteInfinieVide} from "../test/utilities/planèteInfinieVide.ts";
import {Point} from "./geometrie/point.ts";
import {Entier} from "./math/Entier.ts";
import {AvancementEvenement, EvenementRover, ReculEvenement} from "./events/evenementRover.ts";
import {RoverInterface} from "./rover/rover.interface.ts";

const rover1 = new RoverView(1,
    Orientations.Nord,
    new Position(new Point(new Entier(0), new Entier(0)), new PlanèteInfinieVide()));

const rover2 = new RoverView(2,
    Orientations.Nord,
    new Position(new Point(new Entier(0), new Entier(0)), new PlanèteInfinieVide()));

const rover3 = new RoverView(3,
    Orientations.Nord,
    new Position(new Point(new Entier(0), new Entier(0)), new PlanèteInfinieVide()));

const rovers : RoverInterface[] = [rover1, rover2, rover3];

const evenements : EvenementRover[] = [
    new AvancementEvenement(1, 1684423),
    new AvancementEvenement(2, 1684425),
    new ReculEvenement(1, 1684420),
    new ReculEvenement(3, 1682220),
].sort((a, b) => a.CompareTo(b));

rovers.forEach((val, index, arr) => {
    let roverFinal : RoverInterface = val;
    for (const evenement of evenements) {
        roverFinal = evenement.AppliquerSiRoverCorrect(roverFinal);
    }
    arr[index] = roverFinal;
})

