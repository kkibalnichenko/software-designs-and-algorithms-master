import {WeightedGraph} from "./WeightedGraph";
import {Vertex} from "./Vertex";
import {Edge} from "./Edge";

class Graph implements WeightedGraph<Vertex>{
    private vertices: { [key: string]: any } = {};

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
    }
}

const vertex1 = new Vertex('1');
const vertex2 = new Vertex('2');
const vertex3 = new Vertex('3');
const vertex4 = new Vertex('4');
const vertex5 = new Vertex('5');

const vertices = [ vertex1, vertex2, vertex3, vertex4, vertex5 ];
const edges = [
    new Edge(vertex1, vertex4, 3),
    new Edge(vertex1, vertex2, 5),
    new Edge(vertex1, vertex3, 4),
    new Edge(vertex2, vertex4, 6),
    new Edge(vertex2, vertex3, 5),
];
const graph: WeightedGraph<Vertex> = new Graph();

vertices.forEach((verticle: Vertex) => graph.addVertex(verticle.vertex));
edges.forEach((edge: Edge) => graph.addEdge(edge.from, edge.to, edge.weight));

console.log(graph);