import {CommandeRover} from "./CommandeRover";
import {RoverInterface} from "../rover.interface";

export class CommandeVide implements CommandeRover{
    ExécuterSur(rover: RoverInterface): RoverInterface {
        return rover;
    }

}