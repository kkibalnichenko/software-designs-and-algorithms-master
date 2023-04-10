export interface WeightedGraph<T> {
    addVertex(key: string): void;
    addEdge(vertex1: T, vertex2: T, weight: number): void;
}