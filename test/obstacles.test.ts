import { RoverBuilder } from "./utilities/rover.builder";
import { EmptyToroidalPlanet } from "../src/topology/toroidalPlanet";
import { PlanetWithObstacles } from "./utilities/planetWithObstacles";
import { TestPrimitives } from "./utilities/testPrimitives";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { PositionBuilder } from "./utilities/position.builder";
import { WholeNumber } from "../src/math/WholeNumber";

const each = require("jest-each").default;

describe("FEATURE Obstacles", () => {
  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un rover posé en (0,0) orienté %s sur une planet de size 2 " +
      "ET 3 obstacles sur les autres emplacements " +
      "QUAND il avance " +
      "ALORS il ne bouge pas",
    (orientation: Orientation) => {
      const planet = new PlanetWithObstacles(
        new EmptyToroidalPlanet(new WholeNumber(2))
      );
      planet.addObstacle(0, 1);
      planet.addObstacle(1, 0);
      planet.addObstacle(1, 1);

      const startPosition = new PositionBuilder()
        .origin()
        .onPlanet(planet)
        .Build();

      const rover = new RoverBuilder()
        .havingForPosition(startPosition)
        .havingForOrientation(orientation)
        .Build();

      const finalState = rover.GoAhead();

      expect(finalState.Position).toEqual(startPosition);
    }
  );
});
