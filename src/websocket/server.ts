import { WebSocketServer } from 'ws';
import { InterpréteurRover } from '../rover/interpréteurRover';
import { CommandeSimple } from '../rover/commande/CommandeSimple';
import { PositionBuilder } from '../../test/utilities/position.builder';
import { PlaneteBuilder } from '../topologie/planete.builder';
import { RoverBuilder } from '../../test/utilities/rover.builder';
import { Entier } from '../math/Entier';
import { Console } from '../UI/console';

const wss = new WebSocketServer({ port: 8080 });
const sizePlanete = new Entier(6);
const planète = new PlaneteBuilder()
  .DeTaille(sizePlanete.getValue())
  .AyantUnObstacleAuxCoordonnees(3, 3)
  .Build();
const consoleDisplay = new Console(sizePlanete, []);
console.log('SERVER STARTED');
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const positionDépartCommune = new PositionBuilder()
    .AyantPourCoordonnées(0, 0)
    .SurPlanète(planète)
    .Build();

  const roverInterprété = new RoverBuilder()
    .AyantPourPosition(positionDépartCommune)
    .Build();
  let interpréteur = new InterpréteurRover(roverInterprété);

  ws.send(consoleDisplay.DisplayMap(false));

  ws.on('message', function message(data) {
    if(data === "init")
      ws.send(consoleDisplay.DisplayMap(false));
    console.log('received: %s', data);

    try {
      interpréteur = interpréteur.Interpréter(
        new CommandeSimple(data.toString())
      );
    } catch (err) {
      console.log(err);
    }
    // ws.send(`listening on position ${interpréteur.getPosition().toString()}`);
    ws.send(consoleDisplay.DisplayMap(interpréteur));
  });

  ws.send('listening');
});
