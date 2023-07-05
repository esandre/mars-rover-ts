import {RoverWithState} from "../rover/roverWithState.ts";
import {RoverInterface} from "../rover/rover.interface.ts";
import {CommandeRover} from "./commande/CommandeRover.ts";
import '../Websocket/Client';
import { CommandeSimple } from "./commande/CommandeSimple.ts";
import WebSocket from 'ws';

export class InterpréteurRover implements RoverInterface {
    private readonly _rover: RoverInterface;
    private socket: WebSocket;

    public constructor(roverCommandé: RoverInterface, socket: WebSocket){
        this._rover = roverCommandé;
        this.socket = socket;
        this.socket.onmessage = this.InterpréterSocket;
    }

    public InterpréterSocket(event: any){
        const commandeTmp = new CommandeSimple(event)
        this.Interpréter(commandeTmp);
    }

    public Interpréter(commande: CommandeRover) : InterpréteurRover {
        return new InterpréteurRover(commande.ExécuterSur(this._rover), this.socket);
    }

    Avancer(): RoverWithState {
        return this._rover.Avancer();
    }

    Reculer(): RoverWithState {
        return this._rover.Reculer();
    }

    TourneADroite(): RoverWithState {
        return this._rover.TourneADroite();
    }

    TourneAGauche(): RoverWithState {
        return this._rover.TourneAGauche();
    }
}