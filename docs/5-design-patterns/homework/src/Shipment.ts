import { fetchID } from './fetching.service';

export interface ShipmentData {
    readonly shipmentID: number;
    readonly weight: number;
    fromAddress: string;
    fromZipCode: string;
    toAddress: string;
    toZipCode: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
}

export class Shipment {
    public shipmentItem: ShipmentData;
    private static shipment: Shipment;

    private constructor(shipmentItem: ShipmentData) {
        this.shipmentItem = shipmentItem;
    }

    public static getInstance(shipmentItem: ShipmentData): Shipment {
        if (!Shipment.shipment) Shipment.shipment = new Shipment(shipmentItem);

        return Shipment.shipment;
    }

    public static getShipmentID(): number {
        let shipmentID: number;
        fetchID().subscribe((id: number) => shipmentID = id);
        return shipmentID;
    }
    public static ship(item: ShipmentData, cost: string): string {
        return `Shipment with the ID ${item.shipmentID} will be picked up from ${item.fromAddress} ${item.fromZipCode} and shipped to ${item.toAddress} ${item.toZipCode}\nCost = ${cost}`
    }
}