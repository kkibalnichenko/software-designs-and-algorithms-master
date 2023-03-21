import { Letter, Oversize, Package } from './Shipment';

export type ShipmentType = Letter | Package | Oversize;

export interface ShipmentData {
    readonly shipmentID: number;
    readonly weight: number;
    fromAddress: string;
    fromZipCode: string;
    toAddress: string;
    toZipCode: string;
    type?: ShipmentDataType;
}

export interface Address {
    street: string;
    city: string;
    state: string;
}

export interface Ship {
    ship(item: ShipmentData, cost: string): string;
}

export enum ShipmentDataType {
    letter,
    package,
    oversize
}

export enum SpecialCodes {
    Fragile = 'Fragile',
    DoNotLeave = 'Do Not Leave',
    ReturnReceiptRequested = 'Return Receipt Requested',
}