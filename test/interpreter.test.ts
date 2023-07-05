import { RoverBuilder } from "./utilities/rover.builder";
import { RoverInterpreter } from "../src/interpreter/roverInterpreter";
import { CartesianData } from "./utilities/cartesianData";
import { Orientation } from "../src/topology/orientations";
import { TestPrimitives } from "./utilities/testPrimitives";
import { generateCombinations } from "./utilities/generateCombinations";
import { PositionBuilder } from "./utilities/position.builder";
import { SimpleCommand } from "../src/rover/commande/SimpleCommand";
import { CommandComplex } from "../src/rover/commande/CommandComplex";

const each = require("jest-each").default;

const startLatitudes = [0, 1];
const startLongitude = [0, 1];

const testableCommands = ["A", "R", "D", "G"];
const numbersOperands = [2, 3, 5];

function generateCommandsComplexes() {
  let commands: string[] = [];

  for (const numberOperands of numbersOperands) {
    const combinations = generateCombinations(testableCommands, numberOperands);
    // @ts-ignore
    for (const combination of combinations) commands.push(combination);
  }

  return commands;
}

describe("FEATURE Interpreter", () => {
  each(new CartesianData(startLatitudes, startLongitude).toTestCases()).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover en position %s, %s " +
      "QUAND on lui envoie 'A' " +
      "ALORS le Rover avance",
    (latitude: number, longitude: number) => {
      const commonStartPosition = new PositionBuilder()
        .haveForCoordinates(latitude, longitude)
        .Build();

      let testRover = new RoverBuilder()
        .havingForPosition(commonStartPosition)
        .Build();
      const interpretedRover = new RoverBuilder()
        .havingForPosition(commonStartPosition)
        .Build();
      let interpreter = new RoverInterpreter(interpretedRover);

      interpreter = interpreter.Interpreter(new SimpleCommand("A"));
      testRover = testRover.GoAhead();

      expect(interpreter).toEqual(new RoverInterpreter(testRover)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(startLatitudes, startLongitude).toTestCases()).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover en position %s, %s " +
      "QUAND on lui envoie 'R' " +
      "ALORS le Rover avance",
    (latitude: number, longitude: number) => {
      const commonStartPosition = new PositionBuilder()
        .haveForCoordinates(latitude, longitude)
        .Build();

      let testRover = new RoverBuilder()
        .havingForPosition(commonStartPosition)
        .Build();
      const interpretedRover = new RoverBuilder()
        .havingForPosition(commonStartPosition)
        .Build();
      let interpreter = new RoverInterpreter(interpretedRover);

      interpreter = interpreter.Interpreter(new SimpleCommand("R"));
      testRover = testRover.BackOff();

      expect(interpreter).toEqual(new RoverInterpreter(testRover)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover orienté %s " +
      "QUAND on lui envoie 'D' " +
      "ALORS le Rover tourne à droite",
    (startOrientation: Orientation) => {
      let testRover = new RoverBuilder()
        .havingForOrientation(startOrientation)
        .Build();
      const interpretedRover = new RoverBuilder()
        .havingForOrientation(startOrientation)
        .Build();
      let interpreter = new RoverInterpreter(interpretedRover);

      interpreter = interpreter.Interpreter(new SimpleCommand("D"));
      testRover = testRover.turnRight();

      expect(interpreter).toEqual(new RoverInterpreter(testRover)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(TestPrimitives.Orientations).toTestCases()).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover orienté %s " +
      "QUAND on lui envoie 'G' " +
      "ALORS le Rover tourne à droite",
    (startOrientation: Orientation) => {
      let testRover = new RoverBuilder()
        .havingForOrientation(startOrientation)
        .Build();
      const interpretedRover = new RoverBuilder()
        .havingForOrientation(startOrientation)
        .Build();
      let interpreter = new RoverInterpreter(interpretedRover);

      interpreter = interpreter.Interpreter(new SimpleCommand("G"));
      testRover = testRover.turnLeft();

      expect(interpreter).toEqual(new RoverInterpreter(testRover)); // Instanciation obligatoire en raison du systéme d'égalité trop strict de TS
    }
  );

  each(new CartesianData(["B", "VERFEFEF"]).toTestCases()).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover " +
      "QUAND on lui envoie une commande invalide " +
      "ALORS une Exception est lancée",
    (invalidCommand: string) => {
      const interpreter = new RoverInterpreter(new RoverBuilder().Build());

      const commandResult = () =>
        interpreter.Interpreter(new CommandComplex(invalidCommand));

      expect(commandResult).toThrow();
    }
  );
});

describe("FEATURE Commandes Multiples", () => {
  each(
    new CartesianData(
      TestPrimitives.Orientations,
      startLatitudes,
      startLongitude,
      generateCommandsComplexes()
    ).toTestCases()
  ).it(
    "ETANT DONNE un Interpreter " +
      "ET un Rover orienté %s en position %s, %s " +
      "QUAND on lui envoie plusieurs commandes %s " +
      "ALORS le Rover se comporte comme si chacune avait été envoyée à la suite",
    (
      orientation: Orientation,
      latitude: number,
      longitude: number,
      command: string
    ) => {
      const commonStartPosition = new PositionBuilder()
        .haveForCoordinates(latitude, longitude)
        .Build();

      const configurationCommune = new RoverBuilder()
        .havingForPosition(commonStartPosition)
        .havingForOrientation(orientation);

      const testRover = configurationCommune.Build();
      const testedRover = configurationCommune.Build();

      let testedInterpreter = new RoverInterpreter(testedRover);
      let witnessInterpreter = new RoverInterpreter(testRover);

      for (const simpleCommand of command) {
        witnessInterpreter = witnessInterpreter.Interpreter(
          new SimpleCommand(simpleCommand)
        );
      }

      testedInterpreter = testedInterpreter.Interpreter(
        new CommandComplex(command)
      );

      expect(testedInterpreter).toStrictEqual(witnessInterpreter);
    }
  );
});
