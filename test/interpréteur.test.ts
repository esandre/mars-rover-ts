import { RoverBuilder } from "./utilities/rover.builder";
import { RoverInterpreter } from "../src/interpreter/roverInterpreter";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { TestPrimitives } from "./utilities/testPrimitives";
import { générerCombinaisons } from "./utilities/combinatoire";
import { PositionBuilder } from "./utilities/position.builder";
import { SimpleCommand } from "../src/rover/commande/SimpleCommand";
import { CommandComplex } from "../src/rover/commande/CommandComplex";
const each = require("jest-each").default;

const latitudesDépart = [0, 1];
const longitudesDépart = [0, 1];

const commandesTestables = ["A", "R", "D", "G"];
const nombresOpérandes = [2, 3, 5];

function générerCommandesComplexes() {
  let commandes: string[] = [];

  for (const nombreOpérandes of nombresOpérandes) {
    const combinaisons = générerCombinaisons(
      commandesTestables,
      nombreOpérandes
    );
    // @ts-ignore
    for (const combinaison of combinaisons) commandes.push(combinaison);
  }

  return commandes;
}

describe("FEATURE Interpréteur", () => {
  each(new CartesianData(latitudesDépart, longitudesDépart).toTestCases()).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover en position %s, %s " +
      "QUAND on lui envoie 'A' " +
      "ALORS le Rover avance",
    (latitude: number, longitude: number) => {
      const positionDépartCommune = new PositionBuilder()
        .AyantPourCoordonnées(latitude, longitude)
        .Build();

      let roverTémoin = new RoverBuilder()
        .AyantPourPosition(positionDépartCommune)
        .Build();
      const roverInterprété = new RoverBuilder()
        .AyantPourPosition(positionDépartCommune)
        .Build();
      let interpréteur = new RoverInterpreter(roverInterprété);

      interpréteur = interpréteur.Interpreter(new SimpleCommand("A"));
      roverTémoin = roverTémoin.GoAhead();

      expect(interpréteur).toEqual(new RoverInterpreter(roverTémoin)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(latitudesDépart, longitudesDépart).toTestCases()).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover en position %s, %s " +
      "QUAND on lui envoie 'R' " +
      "ALORS le Rover avance",
    (latitude: number, longitude: number) => {
      const positionDépartCommune = new PositionBuilder()
        .AyantPourCoordonnées(latitude, longitude)
        .Build();

      let roverTémoin = new RoverBuilder()
        .AyantPourPosition(positionDépartCommune)
        .Build();
      const roverInterprété = new RoverBuilder()
        .AyantPourPosition(positionDépartCommune)
        .Build();
      let interpréteur = new RoverInterpreter(roverInterprété);

      interpréteur = interpréteur.Interpreter(new SimpleCommand("R"));
      roverTémoin = roverTémoin.BackOff();

      expect(interpréteur).toEqual(new RoverInterpreter(roverTémoin)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover orienté %s " +
      "QUAND on lui envoie 'D' " +
      "ALORS le Rover tourne à droite",
    (orientationDépart: Orientation) => {
      let roverTémoin = new RoverBuilder()
        .AyantPourOrientation(orientationDépart)
        .Build();
      const roverInterprété = new RoverBuilder()
        .AyantPourOrientation(orientationDépart)
        .Build();
      let interpréteur = new RoverInterpreter(roverInterprété);

      interpréteur = interpréteur.Interpreter(new SimpleCommand("D"));
      roverTémoin = roverTémoin.TurnRight();

      expect(interpréteur).toEqual(new RoverInterpreter(roverTémoin)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover orienté %s " +
      "QUAND on lui envoie 'G' " +
      "ALORS le Rover tourne à droite",
    (orientationDépart: Orientation) => {
      let roverTémoin = new RoverBuilder()
        .AyantPourOrientation(orientationDépart)
        .Build();
      const roverInterprété = new RoverBuilder()
        .AyantPourOrientation(orientationDépart)
        .Build();
      let interpréteur = new RoverInterpreter(roverInterprété);

      interpréteur = interpréteur.Interpreter(new SimpleCommand("G"));
      roverTémoin = roverTémoin.TurnLeft();

      expect(interpréteur).toEqual(new RoverInterpreter(roverTémoin)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(["B", "VERFEFEF"]).toTestCases()).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover " +
      "QUAND on lui envoie une commande invalide " +
      "ALORS une Exception est lancée",
    (commandeInvalide: string) => {
      const interpréteur = new RoverInterpreter(new RoverBuilder().Build());

      const résultatCommande = () =>
        interpréteur.Interpreter(new CommandComplex(commandeInvalide));

      expect(résultatCommande).toThrow();
    }
  );
});

describe("FEATURE Commandes Multiples", () => {
  each(
    new CartesianData(
      TestPrimitives.Orientations,
      latitudesDépart,
      longitudesDépart,
      générerCommandesComplexes()
    ).toTestCases()
  ).it(
    "ETANT DONNE un Interpréteur " +
      "ET un Rover orienté %s en position %s, %s " +
      "QUAND on lui envoie plusieurs commandes %s " +
      "ALORS le Rover se comporte comme si chacune avait été envoyée à la suite",
    (
      orientation: Orientation,
      latitude: number,
      longitude: number,
      commande: string
    ) => {
      const positionDépartCommune = new PositionBuilder()
        .AyantPourCoordonnées(latitude, longitude)
        .Build();

      const configurationCommune = new RoverBuilder()
        .AyantPourPosition(positionDépartCommune)
        .AyantPourOrientation(orientation);

      const roverTémoin = configurationCommune.Build();
      const roverTesté = configurationCommune.Build();

      let interpréteurTesté = new RoverInterpreter(roverTesté);
      let interpréteurTémoin = new RoverInterpreter(roverTémoin);

      for (const commandeSimple of commande) {
        interpréteurTémoin = interpréteurTémoin.Interpreter(
          new SimpleCommand(commandeSimple)
        );
      }

      interpréteurTesté = interpréteurTesté.Interpreter(
        new CommandComplex(commande)
      );

      expect(interpréteurTesté).toStrictEqual(interpréteurTémoin);
    }
  );
});
