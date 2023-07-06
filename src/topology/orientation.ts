import { Position } from "../geometry/position";

export interface Orientation {
  clockwiseRotation(): Orientation;

  antiClockwiseRotation(): Orientation;

  goAhead(position: Position): Position;

  backoff(position: Position): Position;

  toString(): string;
}

class OrientationNorth implements Orientation {
  public static Instance = new OrientationNorth();

  private constructor() {}

  goAhead(position: Position): Position {
    return position.incrementLatitudeExceptObstacle();
  }

  backoff(position: Position): Position {
    return position.decrementLatitudeExceptObstacle();
  }

  antiClockwiseRotation(): Orientation {
    return Orientations.West;
  }

  clockwiseRotation(): Orientation {
    return Orientations.East;
  }

  toString(): string {
    return "North";
  }
}

class OrientationSouth implements Orientation {
  public static Instance = new OrientationSouth();

  private constructor() {}

  goAhead(position: Position): Position {
    return position.decrementLatitudeExceptObstacle();
  }

  backoff(position: Position): Position {
    return position.incrementLatitudeExceptObstacle();
  }

  antiClockwiseRotation(): Orientation {
    return Orientations.East;
  }

  clockwiseRotation(): Orientation {
    return Orientations.West;
  }

  toString(): string {
    return "South";
  }
}

class OrientationEast implements Orientation {
  public static Instance = new OrientationEast();

  private constructor() {}

  goAhead(position: Position): Position {
    return position.incrementLongitudeExpectObstacle();
  }

  backoff(position: Position): Position {
    return position.decrementLongitudeExpectObstacle();
  }

  antiClockwiseRotation(): Orientation {
    return Orientations.North;
  }

  clockwiseRotation(): Orientation {
    return Orientations.South;
  }

  toString(): string {
    return "East";
  }
}

class OrientationWest implements Orientation {
  public static Instance = new OrientationWest();

  private constructor() {}

  goAhead(position: Position): Position {
    return position.decrementLongitudeExpectObstacle();
  }

  backoff(position: Position): Position {
    return position.incrementLongitudeExpectObstacle();
  }

  antiClockwiseRotation(): Orientation {
    return Orientations.South;
  }

  clockwiseRotation(): Orientation {
    return Orientations.North;
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
