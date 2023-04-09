import { ShipmentDataType } from './shipment.model';

export interface Shipper {
    getCost(weight: number, type: ShipmentDataType): string;
}

interface ShipperImplementor {
    getCostImplementation(weight: number, type: ShipmentDataType): string;
}

export class AirEastShipper implements Shipper {
    protected implementer: ShipperImplementor

    constructor(implementer: ShipperImplementor) {
        this.implementer = implementer;
    }

    getCost(weight: number, type: ShipmentDataType): string {
        return this.implementer.getCostImplementation(weight, type);
    }
}

export class AirEastShipperImplementer implements ShipperImplementor {
    getCostImplementation(weight: number, type: ShipmentDataType): string {
        return type === ShipmentDataType.letter ? (weight * 0.39).toFixed(2) :
            type === ShipmentDataType.package ? (weight * 0.25).toFixed(2) : (weight * 0.25 + 10).toFixed(2);
    }
}

export class ChicagoSprintShipper implements Shipper {
    protected implementer: ShipperImplementor

    constructor(implementer: ShipperImplementor) {
        this.implementer = implementer;
    }

    getCost(weight: number, type: ShipmentDataType): string {
        return this.implementer.getCostImplementation(weight, type);
    }
}

export class ChicagoSprintShipperImplementer implements ShipperImplementor {
    getCostImplementation(weight: number, type: ShipmentDataType): string {
        return type === ShipmentDataType.letter ? (weight * 0.42).toFixed(2) : (weight * 0.2).toFixed(2);
    }
}

export class PacificParcelShipper implements Shipper {
    protected implementer: ShipperImplementor

    constructor(implementer: ShipperImplementor) {
        this.implementer = implementer;
    }

    getCost(weight: number, type: ShipmentDataType): string {
        return this.implementer.getCostImplementation(weight, type);
    }
}

export class PacificParcelShipperImplementer implements ShipperImplementor {
    getCostImplementation(weight: number, type: ShipmentDataType): string {
        return type === ShipmentDataType.letter ? (weight * 0.51).toFixed(2) :
            type === ShipmentDataType.package ? (weight * 0.19).toFixed(2) : (weight * (0.19 + 0.02)).toFixed(2);
    }
}