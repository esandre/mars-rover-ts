import {PlanèteToroïdaleVide} from "../src/topologie/planeteToroïdale";
import {Entier} from "../src/math/Entier";
import {ReprésentationAscii} from "../src/ui/représentationAscii";
import {TableauAscii} from "../src/ui/tableauAscii";

describe("FONCTIONNALITE UI", () => {
    it('ETANT DONNE une planète toroïdale de taille 1 ' +
        'QUAND on la représente en console ' +
        'ALORS on obtient un carré vide', function () {

        const planète = new PlanèteToroïdaleVide(new Entier(1));

        const représentation = new ReprésentationAscii();
        planète.Visiter(représentation);
        const sortie = représentation.Représenter();

        expect(sortie[0][0]).toBe(' ');
    });

    it('ETANT DONNE une planète toroïdale de taille 2 ' +
        'QUAND on la représente en console ' +
        'ALORS on obtient un tableau de 2x2 carrés vides', function () {

        const planète = new PlanèteToroïdaleVide(new Entier(2));

        const représentation = new ReprésentationAscii();
        planète.Visiter(représentation);
        const sortie = représentation.Représenter();

        expect(sortie[0][0]).toBe(' ');
        expect(sortie[1][0]).toBe(' ');
        expect(sortie[0][1]).toBe(' ');
        expect(sortie[1][1]).toBe(' ');
    });

    it('Test humble object Tableau Ascii avec 1 élément', function () {
        const dessin = new TableauAscii([[' ']]);

        expect(dessin.toString()).toBe(
            '+-+\n' +
                    '| |\n' +
                    '+-+\n');
    });

    it('Test humble object Tableau Ascii avec 1 élément', function () {
        const dessin = new TableauAscii(
            [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]);

        const ligneSéparation = '+-+-+-+\n';
        const ligneValeurs = '| | | |\n';

        expect(dessin.toString()).toBe(
            ligneSéparation + ligneValeurs +
            ligneSéparation + ligneValeurs +
            ligneSéparation + ligneValeurs +
            ligneSéparation + ligneValeurs +
            ligneSéparation
        );
    });
});