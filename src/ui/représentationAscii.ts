import {RepésentateurPlanèteInterface} from "./représentateurPlanète.interface.ts";

export class ReprésentationAscii implements RepésentateurPlanèteInterface {

    private _currentLine : number = 0;
    private _elements: string[][] = [[]];

    public Représenter() : string[][] {
        return this._elements;
    }

    public ReprésenterCelluleVide(): RepésentateurPlanèteInterface {
        this._elements[this._currentLine].push(' ');
        return this;
    }

    public LatitudeSuivante(): RepésentateurPlanèteInterface {
        this._elements.push([]);
        this._currentLine ++;
        return this;
    }
}