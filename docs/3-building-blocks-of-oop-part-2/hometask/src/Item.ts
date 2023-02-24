import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
    public static idCounter: number;
    public readonly name: string;
    public value: number;
    public weight: number;
    private readonly id: number;

    constructor(name: string, value: number, weight: number) {
        this.name = name;
        this.value = value;
        this.weight = weight;

        if (!Item.idCounter) Item.resetIdCounter();
        Item.idCounter++;
        this.id = Item.idCounter;
    }

    public static resetIdCounter(): void {
        Item.idCounter = 0;
    }

    public getId(): number {
        return this.id;
    }

    public compareTo(other: Item): number {
        if (this.value > other.value) return 1;
        if (this.value < other.value) return -1;
        if (this.name > other.name) return 1;
        if (this.name < other.name) return -1;
        return 0;
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
    }

    abstract use(): void;
}