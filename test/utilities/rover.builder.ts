import {Orientations, Orientation} from "../../src/topologie/orientations";
import {Position} from "../../src/geometrie/position";
import {PositionBuilder} from "./position.builder";
import {RoverWithState} from "../../src/rover/roverWithState";

export class RoverBuilder {

    private _orientation: Orientation = Orientations.Nord;
    private _position: Position = PositionBuilder.Origine();

    AyantPourOrientation(orientation: Orientation): RoverBuilder{
        this._orientation = orientation;
        return this;
    };

    AyantPourPosition(position: Position): RoverBuilder{
        this._position = position;
        return this;
    }

    Build(): RoverWithState {
        return new RoverWithState(this._orientation, this._position);
    };
}