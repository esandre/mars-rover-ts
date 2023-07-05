import { RoverBuilder } from "./utilities/rover.builder";
import { EmptyToroidalPlanet } from "../src/topology/toroidalPlanet";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { TestPrimitives } from "./utilities/testPrimitives";
import { PositionBuilder } from "./utilities/position.builder";
import { WholeNumber } from "../src/math/WholeNumber";
const each = require("jest-each").default;

const taillesPlanètes = [1, 2, 10];
const latitudesDépart = [0, 1, 11];
const longitudesDépart = [0, 1, 11];

describe("FEATURE Planète", () => {
  each(
    new CartesianData(
      TestPrimitives.Orientations,
      latitudesDépart,
      longitudesDépart,
      taillesPlanètes
    ).toTestCases()
  ).it(
    "ETANT DONNE un Rover orienté %s " +
      "ET posé aux coordonnées %s, %s sur une planète de taille %s " +
      "QUAND il avance suffisamment pour faire le tour de la planète " +
      "ALORS il est revenu à son point de départ",
    (
      orientation: Orientation,
      latitudeDépart: number,
      longitudeDépart: number,
      taille: number
    ) => {
      const planète = new EmptyToroidalPlanet(new WholeNumber(taille));

      const positionOriginale = new PositionBuilder()
        .AyantPourCoordonnées(latitudeDépart, longitudeDépart)
        .SurPlanète(planète)
        .Build();

      let rover = new RoverBuilder()
        .AyantPourOrientation(orientation)
        .AyantPourPosition(positionOriginale)
        .Build();

      for (let i = 0; i < taille; i++) {
        rover = rover.GoAhead();
      }

      expect(rover.Position).toStrictEqual(positionOriginale);
    }
  );
});
