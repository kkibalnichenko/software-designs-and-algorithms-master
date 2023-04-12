import {Vertex} from "./Vertex";
import {Graph, graph, vertex1, vertex2, vertex3, vertex4, vertex5} from "./Graph";
import {Dijkstra, Path} from "./Dijkstra";
import {shortestPath} from "./helper";

class MyDijkstra implements Dijkstra<Vertex> {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
        const startNode: string = vertex1.vertex;
        const endNode: string = vertex2.vertex;

        return shortestPath(startNode, endNode, this.graph.vertices);
    };

    findAllShortestPaths(vertex: Vertex): Record<string, Path> {
        const result: Record<string, Path> = {};
        for (let vert in this.graph.vertices) {
            if (vert !== vertex.vertex) result[vert] = shortestPath(vertex.vertex, vert, this.graph.vertices)
        }

        return result;
    }
}

const dijkstra: Dijkstra<Vertex> = new MyDijkstra(graph);
console.log(dijkstra.findShortestPath(vertex4, vertex3));
console.log(dijkstra.findShortestPath(vertex1, vertex5));
console.log(dijkstra.findShortestPath(vertex1, vertex1));
console.log(dijkstra.findAllShortestPaths(vertex4));