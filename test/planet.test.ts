import { RoverBuilder } from "./utilities/rover.builder";
import { EmptyToroidalPlanet } from "../src/topology/toroidalPlanet";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { TestPrimitives } from "./utilities/testPrimitives";
import { PositionBuilder } from "./utilities/position.builder";
import { WholeNumber } from "../src/math/WholeNumber";

const each = require("jest-each").default;

const planetsSizes = [1, 2, 10];
const startLatitudes = [0, 1, 11];
const startLongitudes = [0, 1, 11];

describe("FEATURE Planète", () => {
  each(
    new CartesianData(
      TestPrimitives.Orientations,
      startLatitudes,
      startLongitudes,
      planetsSizes
    ).toTestCases()
  ).it(
    "ETANT DONNE un Rover orienté %s " +
      "ET posé aux coordonnées %s, %s sur une planet de size %s " +
      "QUAND il avance suffisamment pour faire le tour de la planet " +
      "ALORS il est revenu à son point de départ",
    (
      orientation: Orientation,
      startLatitude: number,
      startLongitude: number,
      size: number
    ) => {
      const planet = new EmptyToroidalPlanet(new WholeNumber(size));

      const originalPosition = new PositionBuilder()
        .haveForCoordinates(startLatitude, startLongitude)
        .onPlanet(planet)
        .Build();

      let rover = new RoverBuilder()
        .havingForOrientation(orientation)
        .havingForPosition(originalPosition)
        .Build();

      for (let i = 0; i < size; i++) {
        rover = rover.GoAhead();
      }

      expect(rover.Position).toStrictEqual(originalPosition);
    }
  );
});
