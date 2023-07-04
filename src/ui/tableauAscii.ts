/**
 * remarks : Attention, humble object donc sous-testé.
 */
export class TableauAscii {
    private readonly _représentation;

    private static readonly Coin = '+';
    private static readonly TraitHorizontal = '-';
    private static readonly TraitVertical = '|';

    constructor(tableau: string[][]) {
        this._représentation = '';

        for (const lignes of tableau) {
            let ligneAscii = TableauAscii.Coin;

            for (const _ of lignes) {
                ligneAscii += TableauAscii.TraitHorizontal + TableauAscii.Coin;
            }

            ligneAscii += '\n' + TableauAscii.TraitVertical;

            for (const cellule of lignes) {
                ligneAscii += cellule + TableauAscii.TraitVertical;
            }

            ligneAscii += '\n';
            this._représentation += ligneAscii;
        }

        this._représentation += '+';

        for (const _ of tableau[0]) {
            this._représentation += TableauAscii.TraitHorizontal + TableauAscii.Coin;
        }

        this._représentation += '\n';
    }

    public toString(): string {
        return this._représentation;
    }
}