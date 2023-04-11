import {WeightedGraph} from "./WeightedGraph";
import {Vertex} from "./Vertex";
import {Edge} from "./Edge";

export class Graph implements WeightedGraph<Vertex>{
    public vertices: { [key: string]: any } = {};

    addVertex(value: string): void {
        if (!this.vertices[value]) {
            this.vertices[value] = {};
        }
    }

    addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
        if (!(vertex1.vertex in this.vertices) || !(vertex2.vertex in this.vertices)) {
            throw new Error('Such vertices are absent at the graph');
        }

        if (!this.vertices[vertex1.vertex][vertex2.vertex]) {
            this.vertices[vertex1.vertex][vertex2.vertex] = weight;
        }

        if (!this.vertices[vertex2.vertex][vertex1.vertex]) {
            this.vertices[vertex2.vertex][vertex1.vertex] = weight;
        }
    }
}

export const vertex1 = new Vertex('1');
export const vertex2 = new Vertex('2');
export const vertex3 = new Vertex('3');
export const vertex4 = new Vertex('4');
export const vertex5 = new Vertex('5');
const vertices = [ vertex1, vertex2, vertex3, vertex4, vertex5 ];
const edges = [
    new Edge(vertex1, vertex4, 3),
    new Edge(vertex1, vertex2, 5),
    new Edge(vertex1, vertex3, 4),
    new Edge(vertex2, vertex4, 6),
    new Edge(vertex2, vertex3, 5),
];
export const graph = new Graph();

vertices.forEach((verticle: Vertex) => graph.addVertex(verticle.vertex));
edges.forEach((edge: Edge) => graph.addEdge(edge.from, edge.to, edge.weight));