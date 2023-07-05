import WebSocket from 'ws';
const socket = new WebSocket('ws://localhost:8080');

import { RoverOverNetwork } from '../mission-control/roverOverNetwork';
import { InterpréteurRover } from '../interpreteur/interpréteurRover';


import {Orientations} from "../topologie/orientations";
import {RoverBuilder} from "../../test/utilities/rover.builder";
import {PositionBuilder} from "../../test/utilities/position.builder";


const positionOriginale = new PositionBuilder()
.AyantPourCoordonnées(0, 0)
.Build();

const rover = new RoverBuilder()
.AyantPourPosition(positionOriginale)
.AyantPourOrientation(Orientations.Est)
.Build();

socket.onopen = () => {
  const roverOverNetwork = new RoverOverNetwork(socket);
  new InterpréteurRover(rover, socket);
  console.log('WebSocket opened');
  roverOverNetwork.sendMessage('Z');
};