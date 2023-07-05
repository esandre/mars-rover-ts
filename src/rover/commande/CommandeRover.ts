import {RoverInterface} from "../rover.interface.ts";

export interface CommandeRover{
    ExécuterSur(rover: RoverInterface) : RoverInterface;
}