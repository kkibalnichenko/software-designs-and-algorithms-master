import { Weapon } from "./Weapon";

export class Bow extends Weapon {
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number);
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number, name: string);
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number, name?: string) {
        super(name, baseDamage, baseDurability, value, weight);
        this.name = 'bow';
    }

    public polish(): void {
        const newDurabilityModifier = this.durabilityModifier + this.MODIFIER_CHANGE_RATE;

        if (this.getEffectiveDurability(newDurabilityModifier) <= 1) {
            this.durabilityModifier = newDurabilityModifier;
        }
    }
}