export interface QElement {
    element: string;
    priority: number;
}

export class QueueElement implements QElement {
    public element: string;
    public priority: number;

    constructor(element: string, priority: number) {
        this.element = element;
        this.priority = priority;
    }
}
