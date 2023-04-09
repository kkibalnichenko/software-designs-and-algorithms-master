import {Address, ShipmentData, SpecialCodes} from './shipment.model';

function makeID() {
    let count = 1;
    return () => count++;
}
export const idCreator = makeID();

const fromAddress: Address = {
    street: '659 Mockingstreet Lane',
    city: 'Bellevue',
    state: 'Wa'
};
const toAddress: Address = {
    street: '1313 Mockingbird Lane',
    city: 'Tulsa',
    state: 'OK'
};
export const shipment: ShipmentData = {
    shipmentID: 0,
    weight: 14,
    fromAddress: `${fromAddress.street}, ${fromAddress.city}, ${fromAddress.state}`,
    fromZipCode: '92021',
    toAddress: `${toAddress.street}, ${toAddress.city}, ${toAddress.state}`,
    toZipCode: '67721',
}

export const specialCodes: Array<SpecialCodes> = [SpecialCodes.ReturnReceiptRequested, SpecialCodes.Fragile];