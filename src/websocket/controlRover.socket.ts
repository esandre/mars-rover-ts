import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";

class ControlRoverSocket implements MySocketInterface {
  handleConnection(socket: Socket) {
    socket.emit("ping", "socket connection");
  }

  middlewareImplementation(socket: Socket, next) {
    return next();
  }
}

export default ControlRoverSocket;
