import { Item } from "./Item";

export abstract class Consumable extends Item {
    public isConsumed: boolean;
    private readonly _isSpoiled: boolean;

    constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
        super(name, value, weight);
        this._isSpoiled = isSpoiled;
        this.isConsumed = false;
    }

    public isSpoiled(): boolean {
        return this._isSpoiled;
    }

    public use(): string {
        if (this.isConsumed) return `There\'s nothing left of the ${this.name} to consume.`;
        if (!this.isConsumed && !this.isSpoiled()) return `You consumed the ${this.name}.`;
        if (this.isSpoiled()) return `You consumed the ${this.name}.\nYou feel sick.`;
    }
}