import {RoverInterface} from "../rover.interface";

export interface CommandeRover{
    ExécuterSur(rover: RoverInterface) : RoverInterface;
}