import {Either, fromPromise, ap, right, getOrElse, flatten, left} from './fp/either';
import {pipe} from './fp/utils';
import {fetchClient, fetchExecutor} from './fetching';
import {ClientUser, Demand, ExecutorUser} from './types';
import {fromNullable, getOrElse as getOrElseMaybe} from "./fp/maybe";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient()
    .then((data) => data.map(item => {
    return {...item, demands: fromNullable(item.demands)}
    })));

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
    const filteredClients: Array<ClientUser & { distance: number }> = clients
        .filter(client => {
        const clientDemands: Array<Demand> = getOrElseMaybe(() => [])(client.demands);
        return clientDemands.length === 0 ? true : clientDemands.every(elem => executor.possibilities.includes(elem));
    })
        .map(client => {
            const value = parseFloat(Math.sqrt(Math.pow(client.position.x - executor.position.x, 2) + Math.pow(client.position.y - executor.position.y, 2)).toFixed(3));
            return {...client, distance: value}
        });
    sortBy === SortBy.reward ? filteredClients.sort((a, b) => b.reward - a.reward)
        : filteredClients.sort((a, b) => a.distance - b.distance);

    const strOfClients: string = filteredClients.reduce((accumulator: string, currentValue: ClientUser & { distance: number }, index: number) => {
        accumulator = accumulator + `name: ${currentValue.name}, distance: ${currentValue.distance}, reward: ${currentValue.reward}`;
        if (index < filteredClients.length - 1) accumulator = accumulator + '\n';
        return accumulator;
    }, '');

    return filteredClients.length === 0 ? left('This executor cannot meet the demands of any client!')
        : (filteredClients.length === clients.length) ? right('This executor meets all demands of all clients!')
            : right(`This executor meets the demands of only ${filteredClients.length} out of ${clients.length} clients\n
Available clients sorted by ${sortBy === SortBy.reward ? 'highest reward' : 'distance to executor'}:\n${strOfClients}`);
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
