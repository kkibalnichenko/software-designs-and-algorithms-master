import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  private readonly points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    this.points = points;
    this.color = 'green';
    this.filled = true;

    if (color) {
      this.color = color;
      this.filled = filled;
    }

    if (this.points.length < 3) throw new Error('Shape should have at least 3 points');
  };

  public toString(): string {
    const strOfPointsValue: string = this.points.reduce((accumulator: string, currentValue: Point, index: number) => {
      accumulator = accumulator + currentValue.toString();
      if (index < this.points.length - 1) accumulator = accumulator + ', ';
      return accumulator;
    }, '');

    return `A Shape with color of ${this.color} and ${!this.filled ? 'not ' : ''}filled. Points: ${strOfPointsValue}.`
  };

  public getPerimeter(): number {
    let perimeter: number = 0;
    for (let i = 0; i < this.points.length; i++) {
      const next: number = i + 1 !== this.points.length ? i + 1 : 0;
      perimeter = perimeter + this.points[i].distance(this.points[next]);
    }
    return perimeter;
  };

  abstract getType(): string;
}
