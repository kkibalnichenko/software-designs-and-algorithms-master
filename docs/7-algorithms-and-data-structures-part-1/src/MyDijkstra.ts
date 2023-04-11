import {Vertex} from "./Vertex";
import {Graph, graph, vertex1, vertex2, vertex3, vertex4, vertex5} from "./Graph";
import {Dijkstra, Path} from "./Dijkstra";
import {shortestDistanceNode} from "./helper";

class MyDijkstra implements Dijkstra<Vertex> {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
        const startNode: string = vertex1.vertex;
        const endNode: string = vertex2.vertex;
        const infinity: string = 'Infinity';

        const distances: { [key: string]: string | number } = {
            [endNode]: infinity,
            [startNode]: 0,
            ...this.graph.vertices[startNode]
        };

        let parents: { [key: string]: string } = { endNode: '' };
        for (let child in this.graph.vertices[startNode]) {
            parents[child] = startNode;
        }

        let visited: string[] = [];
        let node: string = shortestDistanceNode(distances, visited);

        while (node) {
            let distance: string | number = distances[node];
            let children: { [key: string]: number } = this.graph.vertices[node];

            for (let child in children) {
                if (child === startNode) {
                    continue;
                } else {
                    const newDistance: number = +distance + children[child];
                    if (!distances[child] || distances[child] > newDistance) {
                        distances[child] = newDistance;
                        parents[child] = node;
                    }
                }
            }

            visited = [...visited, node];
            node = shortestDistanceNode(distances, visited);
        }

        let shortestPath: string[] = [];
        if (distances[endNode] !== infinity) shortestPath = [...shortestPath, endNode];
        let parent: string = parents[endNode];

        while (parent) {
            shortestPath = [...shortestPath, parent];
            parent = parents[parent];
        }
        shortestPath.reverse();

        return {
            path: shortestPath,
            distance: +distances[endNode],
        };
    };
}

const dijkstra: Dijkstra<Vertex> = new MyDijkstra(graph);
console.log(dijkstra.findShortestPath(vertex4, vertex3));
console.log(dijkstra.findShortestPath(vertex1, vertex5));
console.log(dijkstra.findShortestPath(vertex1, vertex1));