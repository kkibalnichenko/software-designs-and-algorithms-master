export const shortestDistanceNode = (distances: { [key: string]: string | number }, visited: string[]): string => {
    let shortest = '';

    for (let node in distances) {
        const currentIsShortest = shortest === '' || distances[node] < distances[shortest];
        if (currentIsShortest && !visited.includes(node)) shortest = node;
    }

    return shortest;
};