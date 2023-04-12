import {Path} from "./Dijkstra";
import {VerticesPath} from "./Graph";

export const shortestDistanceNode = (distances: { [key: string]: string | number }, visited: string[]): string => {
    let shortest = '';

    for (let node in distances) {
        const currentIsShortest = shortest === '' || distances[node] < distances[shortest];
        if (currentIsShortest && !visited.includes(node)) shortest = node;
    }

    return shortest;
};

export const shortestPath = (startNode: string, endNode: string, vertices: Record<string, VerticesPath>): Path => {
    const infinity: string = 'Infinity';
    const distances: { [key: string]: string | number } = {
        [endNode]: infinity,
        [startNode]: 0,
        ...vertices[startNode]
    };

    let parents: { [key: string]: string } = { endNode: '' };
    for (let child in vertices[startNode]) {
        parents[child] = startNode;
    }

    let visited: string[] = [];
    let node: string = shortestDistanceNode(distances, visited);

    while (node) {
        let distance: string | number = distances[node];
        let children: { [key: string]: number } = vertices[node];

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
}