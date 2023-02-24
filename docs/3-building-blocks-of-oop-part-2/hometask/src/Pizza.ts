import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    public readonly numberOfSlices: number;
    private numberOfEatenSlices: number = 0;

    constructor(value: number, weight: number, numberOfSlices: number);
    constructor(value: number, weight: number, numberOfSlices: number, name: string);
    constructor(value: number, weight: number, numberOfSlices: number, name?: string) {
        super(name, value, weight);
        this.numberOfSlices = numberOfSlices;
    }

    public use(): string {
        if ((this.numberOfSlices - this.getNumberOfEatenSlices()) > 0) {
            this.numberOfEatenSlices = this.numberOfEatenSlices + 1;
            return 'You consumed a slice of the pizza.';
        } else return 'There\'s nothing left of the pizza to consume.';
    }

    public getNumberOfEatenSlices(): number {
        return this.numberOfEatenSlices;
    }
}