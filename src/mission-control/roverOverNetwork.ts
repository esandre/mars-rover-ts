
import '../Websocket/Server';
import WebSocket from 'ws';

export class RoverOverNetwork {
  private socket: WebSocket;

  constructor(socket: WebSocket){

    this.socket = socket;
    this.socket.onmessage = this.handleMessage;
  }

  public sendMessage(message: string) {
    this.socket.send(message);
  }

  private handleMessage = (event:any) => {
    console.log(`Received new position of the rover : ${event}`);
  };
}