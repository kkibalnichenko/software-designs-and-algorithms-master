interface Coordinates {
    x: number;
    y: number;
}

export class Point {
    private x: number;
    private y: number;
    private point: Coordinates;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        this.point = {x: 0, y: 0};

        if (x || y) {
            this.x = x;
            this.y = y;
            this.point = {x, y};
        }
    };

    public toString(): string {
        return `(${this.point.x}, ${this.point.y})`
    };

    public distance(): number;
    public distance(other: Point): number;
    public distance(other: number, second: number): number;
    public distance(other?: Point | number, second?: number): number {
        if (!other && !second)
            return Math.sqrt(Math.pow(this.point.x, 2) + Math.pow(this.point.y, 2));

        if (other && other instanceof Point)
            return Math.sqrt(Math.pow(other.point.x - this.point.x, 2) + Math.pow(other.point.y - this.point.y, 2));

        if (other && second)
            return Math.sqrt(Math.pow(+other - this.point.x, 2) + Math.pow(second - this.point.y, 2));
        return +false;
    }
}