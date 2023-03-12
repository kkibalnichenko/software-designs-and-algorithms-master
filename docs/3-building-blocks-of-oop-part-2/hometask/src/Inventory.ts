import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory implements ItemComparator {
    private items: Item[] = [];

    public addItem(item: Item): void {
        this.items = [...this.items, item];
    }

    public toString(): string {
        return this.items.reduce((accumulator: string, currentValue: Item, index: number) => {
            accumulator = accumulator + currentValue.toString();
            if (index < this.items.length - 1) accumulator = accumulator + ', ';
            return accumulator;
        }, '');
    }

    public sort(comparator?: ItemComparator): void {
        comparator ? comparator.compare(this.items[1], this.items[0]) : this.items.sort((item1: Item, item2: Item) => item1.value - item2.value);
    }

    public compare(first: Item, second: Item): number {
        if (first.value < second.value) return -1;
        if (first.value > second.value) return 1;
        if (first.value === second.value) return 0;
    }
}