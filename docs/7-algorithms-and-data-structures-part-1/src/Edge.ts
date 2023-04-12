import {Vertex} from "./Vertex";

export class Edge {
    public from: Vertex;
    public to: Vertex;
    public weight: number;

    constructor(vertex1: Vertex, vertex2: Vertex, weight: number) {
        this.from = vertex1;
        this.to = vertex2;
        this.weight = weight;
    }
}