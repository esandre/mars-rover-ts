import { Position } from "../geometry/position";

export interface Orientation {
  ClockwiseRotation(): Orientation;

  AntiClockwiseRotation(): Orientation;

  GoAhead(position: Position): Position;

  Backoff(position: Position): Position;

  toString(): string;
}

class OrientationNorth implements Orientation {
  public static Instance = new OrientationNorth();

  private constructor() {}

  GoAhead(position: Position): Position {
    return position.incrementLatitudeExceptObstacle();
  }

  Backoff(position: Position): Position {
    return position.decrementLatitudeExceptObstacle();
  }

  AntiClockwiseRotation(): Orientation {
    return Orientations.East;
  }

  ClockwiseRotation(): Orientation {
    return Orientations.West;
  }

  toString(): string {
    return "North";
  }
}

class OrientationSouth implements Orientation {
  public static Instance = new OrientationSouth();

  private constructor() {}

  GoAhead(position: Position): Position {
    return position.decrementLatitudeExceptObstacle();
  }

  Backoff(position: Position): Position {
    return position.incrementLatitudeExceptObstacle();
  }

  AntiClockwiseRotation(): Orientation {
    return Orientations.West;
  }

  ClockwiseRotation(): Orientation {
    return Orientations.East;
  }

  toString(): string {
    return "South";
  }
}

class OrientationEast implements Orientation {
  public static Instance = new OrientationEast();

  private constructor() {}

  GoAhead(position: Position): Position {
    return position.incrementLongitudeExpectObstacle();
  }

  Backoff(position: Position): Position {
    return position.decrementLongitudeExpectObstacle();
  }

  AntiClockwiseRotation(): Orientation {
    return Orientations.North;
  }

  ClockwiseRotation(): Orientation {
    return Orientations.South;
  }

  toString(): string {
    return "East";
  }
}

class OrientationWest implements Orientation {
  public static Instance = new OrientationWest();

  private constructor() {}

  GoAhead(position: Position): Position {
    return position.decrementLongitudeExpectObstacle();
  }

  Backoff(position: Position): Position {
    return position.incrementLongitudeExpectObstacle();
  }

  AntiClockwiseRotation(): Orientation {
    return Orientations.West;
  }

  ClockwiseRotation(): Orientation {
    return Orientations.East;
  }

  toString(): string {
    return "West";
  }
}

export class Orientations {
  static North: Orientation = OrientationNorth.Instance;
  static South: Orientation = OrientationSouth.Instance;
  static East: Orientation = OrientationEast.Instance;
  static West: Orientation = OrientationWest.Instance;
}
