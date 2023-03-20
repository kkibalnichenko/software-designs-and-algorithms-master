export interface Shipper {
    getCost(weight: number): string;
}

export class AirEastShipper implements Shipper {
    getCost(weight: number) {
        return (weight * 0.39).toFixed(2);
    }
}

export class ChicagoSprintShipper implements Shipper {
    getCost(weight: number) {
        return (weight * 0.42).toFixed(2);
    }
}

export class PacificParcelShipper implements Shipper {
    getCost(weight: number) {
        return (weight * 0.51).toFixed(2);
    }
}