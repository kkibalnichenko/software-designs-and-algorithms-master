import { Observable } from 'rxjs';
import { idCreator, shipment, specialCodes } from './mocks';
import {ShipmentData, SpecialCodes} from './shipment.model';

export const fetchID = (): Observable<number> => {
    return new Observable(subscriber => subscriber.next(idCreator()));
};

export const fetchShipment = (): Observable<ShipmentData> => {
    return new Observable(subscriber => subscriber.next(shipment));
};

export const fetchSpecialCodes = (): Observable<Array<SpecialCodes>> => {
    return new Observable(subscriber => subscriber.next(specialCodes));
};