import { Item } from "./Item";

export abstract class Weapon extends Item {
    public MODIFIER_CHANGE_RATE: number = 0.05;
    public name: string;

    protected baseDamage: number;
    protected damageModifier: number = 0;
    protected durabilityModifier: number = 0;

    private baseDurability: number;
    private isBroken: boolean = false;

    constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(name, value, weight);
        this.name = name;
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }

    public getEffectiveDamage(): number {
        return this.baseDamage + this.damageModifier;
    }

    public getEffectiveDurability(durabilityModifier?: number): number {
        const durModifier = durabilityModifier || this.durabilityModifier;
        let effectiveDurability = this.baseDurability + durModifier;

        if (effectiveDurability <= 0) {
            effectiveDurability = 0;
            this.isBroken = true;
        }

        return effectiveDurability;
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability() * 100).toFixed(2)}%`;
    }

    public use(): string {
        this.baseDurability = this.baseDurability - this.MODIFIER_CHANGE_RATE;
        const defaultOutput = `You use the ${this.name}, dealing ${this.MODIFIER_CHANGE_RATE} points of damage.`;

        if (this.isBroken) return `You can't use the ${this.name}, it is broken.`;

        if (this.getEffectiveDurability() <= 0)
            return `${defaultOutput}\nThe ${this.name} breaks.`;

        return defaultOutput;
    }

    public abstract polish(): void;
}