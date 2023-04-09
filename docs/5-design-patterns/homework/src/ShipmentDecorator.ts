import { Ship, ShipmentData, SpecialCodes } from './shipment.model';
import { fetchSpecialCodes } from './fetching.service';

class ShipmentDecorator implements Ship {
    protected wrappee: Ship;

    constructor(ship: Ship) {
        this.wrappee = ship;
    }

    public ship(item: ShipmentData, cost: string): string {
        return this.wrappee.ship(item, cost);
    }
}

export class SpecialCodesShipmentDecorator extends ShipmentDecorator {
    public ship(item: ShipmentData, cost: string): string {
        let arrayOfSpecialCodes: Array<SpecialCodes>;
        let strOfSpecialCodes: string = '';
        fetchSpecialCodes().subscribe((data: Array<SpecialCodes>) => arrayOfSpecialCodes = data);

        if (arrayOfSpecialCodes.length > 0) {
            strOfSpecialCodes = arrayOfSpecialCodes.reduce((accumulator: string, currentValue: SpecialCodes) => {
                accumulator = accumulator + `\n**MARK ${currentValue.toUpperCase()}**`;
                return accumulator;
            }, '');
        }

        return this.wrappee.ship(item, cost) + strOfSpecialCodes;
    }
}