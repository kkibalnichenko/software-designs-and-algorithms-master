import { Shape } from "./Shape";
import { Point } from "./Point";

export class Triangle extends Shape {
    private point1: Point;
    private point2: Point;
    private point3: Point;

    constructor(point1: Point, point2: Point, point3: Point);
    constructor(point1: Point, point2: Point, point3: Point, color: string, filled: boolean);
    constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
        super([point1, point2, point3], color, filled);
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
    }

    public toString(): string {
        return `Triangle[v1=${this.point1.toString()},v2=${this.point2.toString()},v3=${this.point3.toString()}]`;
    };

    getType(): string {
        const side1: number = parseFloat(this.point1.distance(this.point2).toFixed(3));
        const side2: number = parseFloat(this.point2.distance(this.point3).toFixed(3));
        const side3: number = parseFloat(this.point1.distance(this.point3).toFixed(3));

        if (side1 === side2 && side1 === side3) return 'equilateral triangle';
        if (side1 !== side2 && side1 !== side3 && side2 !== side3) return 'scalene triangle';
        return 'isosceles triangle';
    };
}