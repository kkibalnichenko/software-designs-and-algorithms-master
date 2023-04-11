export interface Path {
    path: string[];
    distance: number;
}

export interface Dijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T): Path;
    // findAllShortestPaths(vertex: T): Record<string, Path>;
}