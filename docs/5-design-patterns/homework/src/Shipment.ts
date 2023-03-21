import { fetchID } from './fetching.service';
import { Ship, ShipmentData, ShipmentDataType } from './shipment.model';

export abstract class Shipment implements Ship {
    public shipmentItem: ShipmentData;

    protected constructor(shipmentItem: ShipmentData) {
        this.shipmentItem = shipmentItem;
    }

    public static getShipmentID(): number {
        let shipmentID: number;
        fetchID().subscribe((id: number) => shipmentID = id);
        return shipmentID;
    }

    public ship(item: ShipmentData, cost: string): string {
        return `Shipment with the ID ${item.shipmentID} will be picked up from ${item.fromAddress} ${item.fromZipCode} and shipped to ${item.toAddress} ${item.toZipCode}\nCost = ${cost}`
    }
}

export class Letter extends Shipment {
    private static letter: Letter;

    public static getInstance(shipmentItem: ShipmentData): Letter {
        if (!Letter.letter)
            Letter.letter = new Letter({...shipmentItem, type: ShipmentDataType.letter});

        return Letter.letter;
    }
}

export class Package extends Shipment {
    private static package: Package;

    public static getInstance(shipmentItem: ShipmentData): Package {
        if (!Package.package)
            Package.package = new Package({...shipmentItem, type: ShipmentDataType.package});

        return Package.package;
    }
}

export class Oversize extends Shipment {
    private static oversize: Oversize;

    public static getInstance(shipmentItem: ShipmentData): Oversize {
        if (!Oversize.oversize)
            Oversize.oversize = new Oversize({...shipmentItem, type: ShipmentDataType.oversize});

        return Oversize.oversize;
    }
}