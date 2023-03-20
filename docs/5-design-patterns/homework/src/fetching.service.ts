import { Observable } from 'rxjs';
import { idCreator, shipment } from './mocks';
import { ShipmentData } from './Shipment';

export const fetchID = (): Observable<number> => {
    return new Observable(subscriber => subscriber.next(idCreator()));
};

export const fetchShipment = (): Observable<ShipmentData> => {
    return new Observable(subscriber => subscriber.next(shipment));
};