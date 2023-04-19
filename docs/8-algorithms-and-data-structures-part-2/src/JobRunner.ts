import {QElement, QueueElement} from "./Element";

class PriorityQueue {
    private items: QueueElement[];

    constructor() {
        this.items = [];
    }

    insert(element: string, priority: number): void {
        const elem: QueueElement = new QueueElement(element, priority);
        let contain: boolean = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > elem.priority) {
                this.items.splice(i, 0, elem);
                contain = true;
                break;
            }
        }

        if (!contain) this.items = [...this.items, elem];
    }

    maximum(): QueueElement | undefined {
        if (!this.isEmpty()) return this.items[this.items.length - 1];
    }

    extractMax(): QueueElement | undefined {
        if (!this.isEmpty()) return this.items.splice(this.items.length - 1, 1)[0];
    }

    run(): string {
        if (this.isEmpty()) return 'There are no elements for run';

        return this.items.reverse().reduce((accumulator: string, currentValue: QueueElement, index: number) => {
            accumulator = accumulator + currentValue.element;
            if (index < this.items.length - 1) accumulator = accumulator + '\n';
            return accumulator;
        }, '');
    }

    private isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const priorityQueue = new PriorityQueue();
for (let i = 0; i < 10000; i++) {
    const item: QElement = {
        element: `element-${i}`,
        priority: Math.round(Math.random() * 100),
    };
    priorityQueue.insert(item.element, item.priority);
    console.log(item);
}
console.log(priorityQueue.run());
console.log(priorityQueue.maximum());
console.log(priorityQueue.extractMax());
