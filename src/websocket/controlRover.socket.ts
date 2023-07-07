import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";
import { Rover } from "../rover/rover";
import { MissionControlInterface } from "../missionControl/missionControl.interface";

class ControlRoverSocket implements MySocketInterface {
  private readonly _rover: Rover;
  private readonly _missionControl: MissionControlInterface;

  public constructor(rover: Rover, missionControl: MissionControlInterface) {
    this._rover = rover;
    this._missionControl = missionControl;
  }

  handleConnection(socket: Socket) {
    socket.emit("ping", "socket connection");
  }

  middlewareImplementation(socket: Socket, next) {
    return next();
  }
}

export default ControlRoverSocket;
