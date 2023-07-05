import { RoverBuilder } from "./utilities/rover.builder";
import { EmptyToroidalPlanet } from "../src/topology/toroidalPlanet";
import { PlanèteAvecObstacles } from "./utilities/planeteAvecObstacles";
import { TestPrimitives } from "./utilities/testPrimitives";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { PositionBuilder } from "./utilities/position.builder";
import { WholeNumber } from "../src/math/WholeNumber";
const each = require("jest-each").default;

describe("FEATURE Obstacles", () => {
  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un rover posé en (0,0) orienté %s sur une planète de taille 2 " +
      "ET 3 obstacles sur les autres emplacements " +
      "QUAND il avance " +
      "ALORS il ne bouge pas",
    (orientation: Orientation) => {
      const planète = new PlanèteAvecObstacles(
        new EmptyToroidalPlanet(new WholeNumber(2))
      );
      planète.AjouterObstacle(0, 1);
      planète.AjouterObstacle(1, 0);
      planète.AjouterObstacle(1, 1);

      const positionDépart = new PositionBuilder()
        .Origine()
        .SurPlanète(planète)
        .Build();

      const rover = new RoverBuilder()
        .AyantPourPosition(positionDépart)
        .AyantPourOrientation(orientation)
        .Build();

      const étatFinal = rover.GoAhead();

      expect(étatFinal.Position).toEqual(positionDépart);
    }
  );
});
