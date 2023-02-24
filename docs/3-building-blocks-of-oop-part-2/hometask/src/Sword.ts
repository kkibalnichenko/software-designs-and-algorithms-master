import { Weapon } from "./Weapon";

export class Sword extends Weapon {
    private maxBaseDamage: number = 0.25;

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number);
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number, name: string);
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number, name?: string) {
        super(name, baseDamage, baseDurability, value, weight);
        this.name = 'sword';
    }

    public polish(): void {
        if (this.damageModifier < this.maxBaseDamage) {
            this.damageModifier = this.damageModifier + this.MODIFIER_CHANGE_RATE;
        }
    }
}