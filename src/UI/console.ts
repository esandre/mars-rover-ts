import { Entier } from "../math/Entier";
import { InterpréteurRover } from "../rover/interpréteurRover";
import { Point } from "../geometrie/point";

export class Console {
    private planete_taille;
    private obstables;
    private map = "";

    public constructor(planeteTaille: Entier, obstables: Point[]) {
        this.obstables = obstables;
        this.planete_taille = planeteTaille;

        console.log(this.obstables);
        console.log(this.map);
    }
    public DisplayMap(rover: InterpréteurRover) {
        this.map = "";

        const rover_pos = rover.getPosition().getValue();
        const rover_lat = rover_pos.getLat().getValue();
        const rover_lng = rover_pos.getLng().getValue();
        const rover_orientation = rover.getOrientation().toString();

        console.log(rover_orientation);

        // this.planete_taille.getValue()*

        // this.map = this.map.substring(0, 5) + this.map + this.map.substring(5);

        // console.log(position_rover.getValue());

        for (let i = this.planete_taille.getValue() - 1; i >= 0; i--) {
            this.map += "\n"
            for (let y = 0; y < this.planete_taille.getValue(); y++) {
                if(y === rover_lng && i === rover_lat) {
                    switch(rover_orientation) {
                        case "Nord":
                            this.map += "▲";
                            break;
                        case "Sud":
                            this.map += "▼";
                            break;
                        case "Est":
                            this.map += "►";
                            break;
                        case "Ouest":
                            this.map += "◄";
                            break;
                    };
                } else
                    this.map += "-";
            }
        }
        
        // return position_rover.getValue();
        // return "x";

        // return substring(0, index) + replacement + substring(index + 1);

        // console.log(this.position_rover);
        
        // return "\n-------\n---o--"
        return this.map;
    }
}
