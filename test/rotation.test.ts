import { Orientations, Orientation } from "../src/topology/orientations";
import { RoverBuilder } from "./utilities/rover.builder";
const each = require("jest-each").default;

describe("FEATURE Rotation", () => {
  each([
    [Orientations.North, 1, Orientations.East],
    [Orientations.East, 1, Orientations.South],
    [Orientations.South, 1, Orientations.West],
    [Orientations.West, 1, Orientations.North],
    [Orientations.North, 2, Orientations.South],
    [Orientations.East, 2, Orientations.West],
    [Orientations.South, 2, Orientations.North],
    [Orientations.West, 2, Orientations.East],
  ]).it(
    "ETANT DONNE un rover orienté %s " +
      "QUAND il tourne à droite %s fois " +
      "ALORS son orientation est %s",
    (initiale: Orientation, nombreFois: number, finale: Orientations) => {
      const rover = new RoverBuilder().AyantPourOrientation(initiale).Build();

      let orientationRover: Orientations = initiale;
      for (let rotations = 0; rotations < nombreFois; rotations++) {
        orientationRover = rover.TurnRight().Orientation;
      }

      expect(orientationRover).toEqual(finale);
    }
  );

  each([
    [Orientations.North, 1, Orientations.West],
    [Orientations.East, 1, Orientations.North],
    [Orientations.South, 1, Orientations.East],
    [Orientations.West, 1, Orientations.South],
    [Orientations.North, 2, Orientations.South],
    [Orientations.East, 2, Orientations.West],
    [Orientations.South, 2, Orientations.North],
    [Orientations.West, 2, Orientations.East],
  ]).it(
    "ETANT DONNE un rover orienté %s " +
      "QUAND il tourne à gauche %s fois " +
      "ALORS son orientation est %s",
    (initiale: Orientation, nombreFois: number, finale: Orientations) => {
      const rover = new RoverBuilder().AyantPourOrientation(initiale).Build();

      let orientationRover: Orientations = initiale;
      for (let rotations = 0; rotations < nombreFois; rotations++) {
        orientationRover = rover.TurnLeft().Orientation;
      }

      expect(orientationRover).toEqual(finale);
    }
  );
});
